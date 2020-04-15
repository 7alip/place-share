import { RequestHandler } from "express";

export const getUsers: RequestHandler = (req, res, next) => {
  console.log("GET Request in users");
  res.json({ message: "It works " });
};
