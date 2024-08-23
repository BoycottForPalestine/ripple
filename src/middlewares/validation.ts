import Joi from "joi";
import { asyncMiddleware } from "./async";
import { BadRequestError } from "../common/errors";
import { SeaportErrorMessage } from "../common/errors/seaport-error";

// body: POST bodies, for example
export const validateBody = (schema: Joi.ObjectSchema) => {
  return asyncMiddleware(async (req, res, next) => {
    const { value, error } = schema.validate(req.body, {
      // Force convert inputs to correct values
      convert: true,
      // Allow unknown keys
      allowUnknown: false,
      // If no presence value set, the default will be optional
      presence: "optional",
      // Strip unknown keys
      stripUnknown: false,
    });

    if (error) {
      throw BadRequestError(SeaportErrorMessage.VALIDATION_BAD_BODY);
    } else {
      req.body = value;

      return next();
    }
  });
};

// params: The stuff in the express route itself. E.g. /user/:uid, uid is in the params
export const validateParams = (schema: Joi.ObjectSchema) => {
  return asyncMiddleware(async (req, res, next) => {
    const { value, error } = schema.validate(req.params, {
      // Force convert inputs to correct values
      convert: true,
      // Allow unknown keys
      allowUnknown: true,
      // If no presence value set, the default will be optional
      presence: "optional",
      // Strip unknown keys
      stripUnknown: true,
    });

    if (error) {
      throw BadRequestError(SeaportErrorMessage.VALIDATION_BAD_PARAMS);
    }

    req.params = value;

    return next();
  });
};

// query: GET parameters
export const validateQuery = (schema: Joi.ObjectSchema) => {
  return asyncMiddleware(async (req, res, next) => {
    const { value, error } = schema.validate(req.query, {
      // Force convert inputs to correct values
      convert: true,
      // Allow unknown keys
      allowUnknown: true,
      // If no presence value set, the default will be optional
      presence: "optional",
    });

    if (error) {
      throw BadRequestError(SeaportErrorMessage.VALIDATION_BAD_QUERY);
    }

    req.query = value;

    return next();
  });
};
