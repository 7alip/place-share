import { v4 } from "uuid";
import { v4String } from "uuid/interfaces";
import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import HttpError from "../../models/http-errors.model";

import DUMMY_USERS from "./dummy-users.json";

interface ILoginUser {
  email: string;
  password: string;
}

interface ISignupUser {
  name: string;
  email: string;
  password: string;
}

interface INewUser {
  id: v4String | string;
  name: string;
  email: string;
  password: string;
}

export const getUsers: RequestHandler = (req, res, next) => {
  res.json(DUMMY_USERS);
};

export const signup: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    throw new HttpError("Invalid inputs passed, please check your data", 422);

  const { name, email, password }: ISignupUser = req.body;

  const hasUser: boolean = DUMMY_USERS.some(
    (user: INewUser) => user.email === email
  );

  if (hasUser)
    throw new HttpError("Could not create user, email already exist.", 422);

  const createdUser = {
    id: v4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json(createdUser);
};

export const login: RequestHandler = (req, res, next) => {
  const { email, password }: ILoginUser = req.body;

  const idenfitiedUser: ILoginUser = DUMMY_USERS.find(
    (user: ILoginUser) => user.email === email
  )!;

  if (!idenfitiedUser || idenfitiedUser.password !== password)
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      401
    );

  res.json("Logged in!");
};
