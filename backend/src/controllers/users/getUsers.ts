import { RequestHandler } from "express";

import HttpError from "../../models/http-errors.model";
import User from "../../models/user.model";

export const getUsers: RequestHandler = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (error) {
    return next(
      new HttpError("Fetching users failed, please try again later", 500)
    );
  }

  res.json({ users });
};
