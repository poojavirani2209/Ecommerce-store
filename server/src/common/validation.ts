import Joi from "joi";

// Middleware for validating request bodies
export const validate = (schema: Joi.ObjectSchema, objectToCheck:any) => {
  const { error } = schema.validate(objectToCheck);
  if (error) {
    throw new Error(error.details[0].message);
  }
};
