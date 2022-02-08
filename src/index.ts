import express from "express";

import "./config";

import bodyParser from "body-parser";
import { errorHandler, notFound } from "./middlewares";

const app = express();
app.use(bodyParser());

import userRouter from "./routers/users";
app.use("/api/v1/users", userRouter);

app.use((req, res, next) => {
  return res.status(404).json({ message: "not found" });
});

app.use(notFound);

app.use(errorHandler);

const port = 3000;

app.listen(port, () => console.log(`Server started at port ${port}`));
