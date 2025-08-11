import { Router } from "express";
import { ValidationMiddleware } from "@presentation/http/middlewares/ValidationMiddleware";
import { CreateDirectorSchema } from "@presentation/http/validations/DirectorValidationSchemas";
import * as directorController from "@presentation/http/controllers/DirectorController";

const router = Router();

router.post(
  "/",
  ValidationMiddleware(CreateDirectorSchema),
  directorController.create,
);
router.delete("/:id", directorController.remove);

export default router;
