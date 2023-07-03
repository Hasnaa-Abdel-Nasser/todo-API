import Joi from "joi";

export const addTask = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(100),
  list: Joi.string().required(),
  timedate: Joi.date().required(),
  subTask: Joi.array().items(Joi.string())
});

export const editTask = Joi.object({
  _id: Joi.string().hex().length(24).required(),
    title: Joi.string().min(3).max(50),
    description: Joi.string().max(100),
    list: Joi.string(),
    timedate: Joi.date(),
    subTask: Joi.array().items(Joi.string()),
    completed: Joi.boolean()
});

