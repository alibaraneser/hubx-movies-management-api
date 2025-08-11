import Joi from "joi";

export const CreateMovieSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  releaseDate: Joi.date().required(),
  genre: Joi.string().min(1).required(),
  rating: Joi.number().min(0).max(10).required(),
  imdbId: Joi.string().min(1).required(),
  director: Joi.string().required(),
});

export const UpdateMovieSchema = Joi.object({
  title: Joi.string().min(1),
  description: Joi.string().min(1),
  releaseDate: Joi.date(),
  genre: Joi.string().min(1),
  rating: Joi.number().min(0).max(10),
  imdbId: Joi.string().min(1),
  director: Joi.string(),
}).min(1);
