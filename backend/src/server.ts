import express from "express";
import bodyParser from "body-parser";

import corsMiddleware from "./middlewares/cors-middleware";
import errorHandlerMiddleware from "./middlewares/errorHandler-middleware";
import placesRouter from "./routes/places-routes";
import usersRouter from "./routes/users-routes";
import notFoundMiddleware from "./middlewares/notFound-middleware";

const app = express();

app.use(bodyParser.json());
app.use(corsMiddleware);

app.use("/api/user", usersRouter);
app.use("/api/places", placesRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(5000);
