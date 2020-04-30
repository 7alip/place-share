import { Router } from "express";
import { check } from "express-validator";
import methodOverride from "method-override";

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
} from "../controllers/places";
import { fileUpload } from "../middlewares/fileUpload-middleware";
import checkAuthMiddleware from "../middlewares/checkAuth-middleware";

const placesRouter = Router();

placesRouter.get("/", getAllPlaces);
placesRouter.get("/:pid", getPlaceById);
placesRouter.get("/user/:uid", getPlacesByUserId);

placesRouter.use(checkAuthMiddleware);

placesRouter.post(
  "/",
  fileUpload.single("image"),
  checkCreatePlace,
  createPlace
);

placesRouter.patch("/:pid", checkUpdatePlace, updatePlaceById);
placesRouter.delete("/:pid", deletePlaceById);

export default placesRouter;
