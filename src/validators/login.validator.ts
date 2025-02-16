import Joi from "joi";

export const authValidator = Joi.object({
    username: Joi.string().min(1).pattern(/[a-zA-Z0-9]+/).required(),
    password: Joi.string().min(1).required()
});