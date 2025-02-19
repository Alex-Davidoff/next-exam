import Joi from "joi";

export const searchValidator = Joi.object({
    searchBy: Joi.string().min(1).pattern(/[a-zA-Z0-9]+/).required()
});