import { RequestHandler } from "express";

import HttpError from "../../models/http-errors.model";
import User, { IUser } from "../../models/user.model";

interface ILoginUser {
  email: IUser["email"];
  password: IUser["password"];
}

export const login: RequestHandler = async (req, res, next) => {
  const { email, password }: ILoginUser = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later", 500)
    );
  }

  if (!existingUser || existingUser.password !== password)
    return next(
      new HttpError("Invalid credentials, could not log you in.", 401)
    );

  res.json("Logged in!");
};
