import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

import HttpError from "../models/http-errors.model";

const CheckAuthMiddleware: RequestHandler = (req, res, next) => {
  if (req.method === "OPTIONS") return next();

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Authentication failed!");
    }

    const decodedToken = jwt.verify(token, "jwtsecret") as { userId: string };
    req.body.userId = decodedToken.userId;
    next();
  } catch (error) {
    return next(new HttpError("Authentication failed!", 403));
  }
};

export default CheckAuthMiddleware;
