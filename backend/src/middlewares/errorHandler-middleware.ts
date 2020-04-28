import { ErrorRequestHandler } from "express";

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  res.status(err.code || 500);
  res.json({ message: err.message || "Internal server error!" });
};

export default errorHandlerMiddleware;