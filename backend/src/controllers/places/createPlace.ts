import { startSession } from "mongoose";
import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import User from "../../models/user.model";
import Place, { IPlace } from "../../models/place.model";
import HttpError from "../../models/http-errors.model";
import getCoordsForAddress from "../../utils/location";

export const createPlace: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );

  const { title, description, address, creator } = req.body;
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
    image: req.file?.path,
  });

  try {
    const session = await startSession();
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
