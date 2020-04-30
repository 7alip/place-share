import { ErrorRequestHandler } from "express";
import fs from "fs";

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }

  if (res.headersSent) return next(err);

  res.status(err.code || 500);
  res.json({ message: err.message || "Internal server error!" });
};

export default errorHandlerMiddleware;
