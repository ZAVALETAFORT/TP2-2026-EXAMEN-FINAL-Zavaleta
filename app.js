import express from "express";
import buildContainer from "./container/container.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

export default function createApp() {
  const app = express();
  app.use(express.json());
  app.use("/items", buildContainer());
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
