import { RequestHandler } from "express";

import HttpError from "../../models/http-errors.model";
import Place, { IPlace } from "../../models/place.model";

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
