import { Request, Response, NextFunction } from "express";
import { container } from "@container/Container";
import { CreateMovie } from "@application/use-cases/movie/CreateMovie";
import { ListMovies } from "@application/use-cases/movie/ListMovies";
import { UpdateMovie } from "@application/use-cases/movie/UpdateMovie";
import { DeleteMovie } from "@application/use-cases/movie/DeleteMovie";
import { ApiResponse } from "@shared/utils/ApiResponse";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const useCase = container.resolve("CreateMovie") as CreateMovie;
    const movie = await useCase.execute(req.body);
    return res.status(201).json(
      ApiResponse.success(movie, "Movie created successfully", {
        timestamp: new Date().toISOString(),
        requestId: req.headers["x-request-id"] as string,
      }),
    );
  } catch (err) {
    next(err);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const useCase = container.resolve("ListMovies") as ListMovies;
    const movies = await useCase.execute();
    return res.json(
      ApiResponse.success(movies, undefined, {
        timestamp: new Date().toISOString(),
        requestId: req.headers["x-request-id"] as string,
      }),
    );
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const useCase = container.resolve("UpdateMovie") as UpdateMovie;
    const movie = await useCase.execute(req.params.id, req.body);
    return res.json(
      ApiResponse.success(movie, "Movie updated successfully", {
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
    const useCase = container.resolve("DeleteMovie") as DeleteMovie;
    await useCase.execute(req.params.id);
    return res.json(
      ApiResponse.success(null, "Movie deleted successfully", {
        timestamp: new Date().toISOString(),
        requestId: req.headers["x-request-id"] as string,
      }),
    );
  } catch (err) {
    next(err);
  }
};
