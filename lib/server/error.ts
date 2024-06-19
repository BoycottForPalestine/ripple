export function BadRequestResponse(message?: string) {
  return new Response(message, { status: 400 });
}

export function NotFoundResponse(message?: string) {
  return new Response(message, { status: 404 });
}

export function UnauthorizedResponse(message?: string) {
  return new Response(message, { status: 401 });
}

export function RateLimitResponse(message?: string) {
  return new Response(message, { status: 429 });
}

export function InternalErrorResponse(message?: string) {
  return new Response(message, { status: 500 });
}

// errors caught by try/catch are unknown by default
// so this converts it to an InternalErrorResponse
export function createInternalErrorResponse(error: unknown) {
  let message: string;
  if (error instanceof Error) message = error.message;
  else message = String(error);
  return InternalErrorResponse(message);
}
