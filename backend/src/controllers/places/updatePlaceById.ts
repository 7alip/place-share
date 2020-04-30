import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import HttpError from "../../models/http-errors.model";
import Place from "../../models/place.model";

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
    return next(
      new HttpError("Could not find a place for the provided id", 404)
    );

  if (place.creator.toString() !== req.body.userId)
    return next(new HttpError("You are not allowed to edit this place", 401));

  res.status(201).json({ place });
};
