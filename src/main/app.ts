import express from "express";
import "../container/bindings/RepositoryBindings";
import "../container/bindings/ServiceBindings";
import "../container/bindings/UseCaseBindings";
import api from "@presentation/http/routes";
import { LoggerMiddleware } from "@presentation/http/middlewares/LoggerMiddleware";
import {
  ErrorHandlerMiddleware,
  NotFoundHandler,
} from "@presentation/http/middlewares/ErrorHandlerMiddleware";
import { SecurityMiddlewares } from "@presentation/http/middlewares/SecurityMiddleware";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(LoggerMiddleware);

  // Security middlewares
  app.use(...SecurityMiddlewares);

  app.get("/", (req, res) => {
    res.send("Welcome to 🎬 HubX Movies Management API");
  });

  app.use("/api", api);

  app.use(NotFoundHandler);
  app.use(ErrorHandlerMiddleware);

  return app;
}
