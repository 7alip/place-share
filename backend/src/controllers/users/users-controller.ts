import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import HttpError from "../../models/http-errors.model";
import User, { IUser } from "../../models/user.model";

interface ILoginUser {
  email: IUser["email"];
  password: IUser["password"];
}

interface ISignupUser {
  name: IUser["name"];
  email: IUser["email"];
  password: IUser["password"];
}

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

export const signup: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    throw new HttpError("Invalid inputs passed, please check your data", 422);

  const { name, email, password }: ISignupUser = req.body;

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
    image: "user-image-url",
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
