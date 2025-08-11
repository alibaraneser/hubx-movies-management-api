import { Request, Response } from "express";
import { ApiResponse } from "@shared/types/ApiResponse";

export function ErrorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
) {
  const statusCode = 500;
  const response: ApiResponse<null> = {
    success: false,
    message: err.message || "Internal Server Error",
    data: null,
  };
  res.status(statusCode).json(response);
}

export function NotFoundHandler(req: Request, res: Response) {
  const response: ApiResponse<null> = {
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
    data: null,
  };
  res.status(404).json(response);
}
