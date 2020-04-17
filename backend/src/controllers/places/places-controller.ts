import { v4 } from "uuid";
import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import HttpError from "../../models/http-errors.model";
import getCoordsForAddress from "../../utils/location";

import DUMMY_PLACES from "./dummy-places.json";

interface IPlace {
  id: string;
  title: string;
  description: string;
  coordinates: { lat: number; lng: number };
  address: string;
  creatorId: string;
  imageUrl: string;
}

export const getAllPlaces: RequestHandler = (req, res, next) => {
  res.json(DUMMY_PLACES);
};

export const getPlaceById: RequestHandler = (req, res, next) => {
  const placeId = req.params.pid;

  const place = DUMMY_PLACES.find((place: IPlace) => place.id === placeId);

  if (!place)
    throw new HttpError("Could not find a place for the provided id", 404);

  res.json(place);
};

export const getPlacesByUserId: RequestHandler = (req, res, next) => {
  const userId = req.params.uid;
  const places: IPlace[] = DUMMY_PLACES.filter(
    (place: any) => place.creatorId === userId
  );

  if (places.length === 0)
    throw new HttpError("Could not find a place for the provided user id", 404);

  res.json(places);
};

export const createPlace: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return next(
      new HttpError("Invalid inputs passed, please check your data", 422)
    );

  const { title, description, address, creatorId, imageUrl }: IPlace = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace: IPlace = {
    id: v4(),
    title,
    description,
    address,
    coordinates: { lat: +coordinates[0], lng: +coordinates[1] },
    creatorId,
    imageUrl: imageUrl || "",
  };
  DUMMY_PLACES.push(createdPlace);

  res.status(201).json(DUMMY_PLACES);
};

export const updatePlaceById: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    throw new HttpError("Invalid inputs passed, please check your data", 422);

  const placeId: string = req.params.pid;
  const { title, description } = req.body;

  const updatedPlace: any = {
    ...DUMMY_PLACES.find((place: IPlace) => place.id === placeId),
  };

  const placeIndex: number = DUMMY_PLACES.findIndex(
    (place: IPlace) => place.id === placeId
  );

  if (!updatedPlace)
    throw new HttpError("Could not find a place for the provided id", 404);

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(201).json(updatedPlace);
};

export const deletePlaceById: RequestHandler = (req, res, next) => {
  const placeId = req.params.pid;

  if (!DUMMY_PLACES.find((place: IPlace) => place.id === placeId))
    throw new HttpError("Could not find a place for that id", 422);

  const placeExist = DUMMY_PLACES.some((place: IPlace) => place.id === placeId);

  if (!placeExist)
    throw new HttpError("Could not find a place for the provided user id", 404);

  const restPlaces = DUMMY_PLACES.filter(
    (place: IPlace) => place.id !== placeId
  );

  res.status(201).json(restPlaces);
};
