import { RequestHandler } from "express";

import Place from "../../models/place.model";
import HttpError from "../../models/http-errors.model";

export const getAllPlaces: RequestHandler = async (req, res, next) => {
  let places;
  try {
    places = await Place.find().exec();
  } catch (error) {
    next(new HttpError("Something went wrong, could not find a place", 500));
  }

  res.json({ places });
};
