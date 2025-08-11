import { Request, Response, NextFunction } from "express";
import { Schema, ValidationErrorItem } from "joi";

export const ValidationMiddleware = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const details = error.details.map((d: ValidationErrorItem) => d.message);
      return res
        .status(400)
        .json({ success: false, message: details.join(", ") });
    }
    next();
  };
};
