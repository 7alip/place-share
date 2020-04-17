import { RequestHandler } from "express";

import HttpError from "../models/http-errors.model";

const notFoundMiddleware: RequestHandler = (req, res, next) => {
  throw new HttpError("Could not find this route.", 404);
};

export default notFoundMiddleware;
