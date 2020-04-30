import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";

import corsMiddleware from "./middlewares/cors-middleware";
import errorHandlerMiddleware from "./middlewares/errorHandler-middleware";
import placesRouter from "./routes/places-routes";
import usersRouter from "./routes/users-routes";
import notFoundMiddleware from "./middlewares/notFound-middleware";

const app = express();

app.use(bodyParser.json());
app.use(
  "/src/uploads/images",
  express.static(path.join("src", "uploads", "images"))
);
app.use(corsMiddleware);

app.use("/api/user", usersRouter);
app.use("/api/places", placesRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

mongoose
  .connect(
    "mongodb+srv://testtest:testtest@cluster0-31adc.mongodb.net/test?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => console.log(error));
