import { Router } from "express";
import { check } from "express-validator";

const checkCreatePlace: any[] = [
  check("title").not().isEmpty(),
  check("description").isLength({ min: 5 }),
  check("address").not().isEmpty(),
];

const checkUpdatePlace: any[] = [
  check("title").not().isEmpty(),
  check("description").isLength({ min: 5 }),
];

import {
  getAllPlaces,
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlaceById,
  deletePlaceById,
} from "../controllers/places/places-controller";

const placesRouter = Router();

placesRouter.get("/", getAllPlaces);
placesRouter.get("/:pid", getPlaceById);
placesRouter.get("/user/:uid", getPlacesByUserId);
placesRouter.post("/", checkCreatePlace, createPlace);
placesRouter.patch("/:pid", checkUpdatePlace, updatePlaceById);
placesRouter.delete("/:pid", deletePlaceById);

export default placesRouter;
