import { RequestHandler } from "express";
import { ClientSession, startSession } from "mongoose";

import HttpError from "../../models/http-errors.model";
import Place from "../../models/place.model";

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

  if (!place)
    return next(
      new HttpError("Could not find this place for provided id", 404)
    );

  try {
    const session: ClientSession = await startSession();
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
