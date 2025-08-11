import { Request, Response, NextFunction } from "express";
import { container } from "@container/Container";
import { CreateDirector } from "@application/use-cases/director/CreateDirector";
import { DeleteDirector } from "@application/use-cases/director/DeleteDirector";
import { ApiResponse } from "@shared/utils/ApiResponse";

const createDirector = container.resolve(CreateDirector);
const deleteDirector = container.resolve(DeleteDirector);

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const director = await createDirector.execute(req.body);
    return res.status(201).json(
      ApiResponse.success(director, "Director created successfully", {
        timestamp: new Date().toISOString(),
        requestId: req.headers["x-request-id"] as string,
      }),
    );
  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await deleteDirector.execute(req.params.id);
    return res.json(
      ApiResponse.success(null, "Director deleted successfully", {
        timestamp: new Date().toISOString(),
        requestId: req.headers["x-request-id"] as string,
      }),
    );
  } catch (err) {
    next(err);
  }
};
