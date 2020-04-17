import { RequestHandler } from "express";

import User from "../../models/user.model";
import HttpError from "../../models/http-errors.model";

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
