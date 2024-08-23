import HttpStatusCode from "./http-status-code";
import { RippleErrorMessage } from "./ripple-error";

export class RippleError extends Error {
  cause: Error | null;
  httpCode: HttpStatusCode;

  constructor(httpCode: HttpStatusCode, message: RippleErrorMessage) {
    super(message);

    this.httpCode = httpCode;
    this.cause = null;

    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;

    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    Error.captureStackTrace(this, this.constructor);
  }

  getHttpCode() {
    return this.httpCode;
  }
}

export const BadRequestError = (message: RippleErrorMessage) =>
  new RippleError(HttpStatusCode.BAD_REQUEST, message);
export const UnauthorizedError = (message: RippleErrorMessage) =>
  new RippleError(HttpStatusCode.UNAUTHORIZED, message);
export const NotFoundError = (message: RippleErrorMessage) =>
  new RippleError(HttpStatusCode.NOT_FOUND, message);
export const InternalServerError = (message: RippleErrorMessage) =>
  new RippleError(HttpStatusCode.INTERNAL_SERVER_ERROR, message);
