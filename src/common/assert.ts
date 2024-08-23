import { ObjectId } from "mongodb";
import {
  BadRequestError,
  InternalServerError,
  SeaportError,
  UnauthorizedError,
} from "./errors";
import { SeaportErrorMessage } from "./errors/seaport-error";

export const checkState = (
  expression: boolean,
  errorMessage: SeaportErrorMessage
) => {
  if (!expression) {
    throw BadRequestError(errorMessage);
  }
};

export const checkPermission = (
  expression: boolean,
  errorMessage: SeaportErrorMessage
) => {
  if (!expression) {
    throw UnauthorizedError(errorMessage);
  }
};

export const assert = (
  expression: boolean,
  errorMessage: SeaportErrorMessage
) => {
  if (!expression) {
    throw InternalServerError(errorMessage);
  }
};

export function isValidId(id: string): boolean {
  try {
    new ObjectId(id);
    return true;
  } catch (e) {
    return false;
  }
}
