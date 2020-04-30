import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import HttpError from "../../models/http-errors.model";
import User, { IUser } from "../../models/user.model";

interface ISignupUser {
  name: IUser["name"];
  email: IUser["email"];
  password: IUser["password"];
  image: IUser["image"];
}

export const signup: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

  const { name, email, password, image }: ISignupUser = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later", 500)
    );
  }

  if (existingUser)
    return next(
      new HttpError("Could not create user, email already exist.", 422)
    );

  const createdUser: IUser = new User({
    name,
    email,
    image: req.file?.path,
    password,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later", 500)
    );
  }

  res.status(201).json({ user: createdUser });
};
