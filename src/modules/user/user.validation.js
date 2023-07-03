import Joi from "joi";

export const signUp = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().required().email(),
  password: Joi.string().min(8).max(20).required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')),
  rePassword: Joi.ref('password')
});

export const signIn = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(8).max(20).required()
});

export const verify = Joi.object({
  email: Joi.string().required().email(),
  code:Joi.string().required()
});

export const newPassword = Joi.object({
  password: Joi.string().min(8).max(20).required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')),
  rePassword: Joi.ref('password')
});