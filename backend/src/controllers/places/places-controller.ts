import { RequestHandler } from "express";
import mongoose, { ClientSession } from "mongoose";
import { validationResult } from "express-validator";

import HttpError from "../../models/http-errors.model";
import Place, { IPlace } from "../../models/place.model";
import getCoordsForAddress from "../../utils/location";

import User from "../../models/user.model";

export const getAllPlaces: RequestHandler = async (req, res, next) => {
  let places;
  try {
    places = await Place.find().exec();
  } catch (error) {
    next(new HttpError("Something went wrong, could not find a place", 500));
  }

  res.json({ places });
};
export const getPlaceById: RequestHandler = async (req, res, next) => {
  const placeId: IPlace["_id"] = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).exec();
  } catch (error) {
    next(new HttpError("Something went wrong, could not find a place", 500));
  }

  if (!place)
    return next(
      new HttpError("Could not find a place for the provided id", 404)
    );

  res.json({ place: place.toObject({ getters: true }) });
};

export const getPlacesByUserId: RequestHandler = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(userId).populate("places");
  } catch (error) {
    return next(
      new HttpError("Fetching places failed, please try again later", 500)
    );
  }

  if (!userWithPlaces || userWithPlaces.places.length === 0)
    return next(
      new HttpError("Could not find a place for the provided user id", 404)
    );

  res.json({
    places: userWithPlaces.places.map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

export const createPlace: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );

  const { title, description, address, creator, imageUrl } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  let user;
  try {
    user = await User.findById(creator).exec();
  } catch (error) {
    return next(
      new HttpError(
        error.reason || "Fetching places failed, please try again later",
        500
      )
    );
  }

  if (!user)
    return next(new HttpError("Could not find user for provided id", 404));

  const createdPlace: IPlace = new Place({
    title,
    description,
    address,
    coordinates: { lat: coordinates[0], lng: coordinates[1] },
    creator,
    imageUrl: imageUrl || "image-url",
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPlace.save({ session });
    user.places.push(createdPlace);
    await user.save({ session });
    await session.commitTransaction();
  } catch (error) {
    return next(
      new HttpError("Creating place failed, please try again later", 500)
    );
  }

  res.status(201).json({ place: createPlace });
};

export const updatePlaceById: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    throw new HttpError("Invalid inputs passed, please check your data", 422);

  const placeId: string = req.params.pid;
  const { title, description } = req.body;

  let place;
  try {
    place = await Place.findByIdAndUpdate(
      placeId,
      { title, description },
      { new: true }
    );
  } catch (error) {
    next(new HttpError("Could not find a place for the provided id", 500));
  }

  if (!place)
    next(new HttpError("Could not find a place for the provided id", 404));

  res.status(201).json({ place });
};

export const deletePlaceById: RequestHandler = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not delete the place", 500)
    );
  }

  console.log("place", place);

  if (!place)
    return next(
      new HttpError("Could not find this place for provided id", 404)
    );

  try {
    const session: ClientSession = await mongoose.startSession();
    session.startTransaction();
    await place.remove(() => {
      {
        session;
      }
    });
    await place.creator.places.pull(place);
    await place.creator.save({ session });
    session.commitTransaction();
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not delete the place", 500)
    );
  }

  res.status(201).json("Deleted succesfully");
};
