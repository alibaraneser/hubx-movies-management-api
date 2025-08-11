import { Router } from "express";
import { ValidationMiddleware } from "@presentation/http/middlewares/ValidationMiddleware";
import {
  CreateMovieSchema,
  UpdateMovieSchema,
} from "@presentation/http/validations/MovieValidationSchemas";
import * as movieController from "@presentation/http/controllers/MovieController";

const router = Router();

router.post(
  "/",
  ValidationMiddleware(CreateMovieSchema),
  movieController.create,
);
router.get("/", movieController.getAll);
router.put(
  "/:id",
  ValidationMiddleware(UpdateMovieSchema),
  movieController.update,
);
router.delete("/:id", movieController.remove);

export default router;
