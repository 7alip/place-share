import { RequestHandler } from "express";
import bcrypt from "bcryptjs";

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

  if (!existingUser)
    return next(
      new HttpError("Invalid credentials, could not log you in.", 401)
    );

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return next(
      new HttpError(
        "Could not log you in, please check your credentials and try again.",
        500
      )
    );
  }

  if (!isValidPassword)
    return next(
      new HttpError("Invalid credentials, could not log you in.", 401)
    );

  res.json({ message: "Logged in!", user: existingUser });
};
