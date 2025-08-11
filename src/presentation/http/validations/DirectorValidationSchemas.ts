import Joi from "joi";

export const CreateDirectorSchema = Joi.object({
  firstName: Joi.string().min(1).required(),
  secondName: Joi.string().min(1).required(),
  birthDate: Joi.date().required(),
  bio: Joi.string().min(1).required(),
});
