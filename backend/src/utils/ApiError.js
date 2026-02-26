export class ApiError extends Error {
constructor(statusCode, message = "Something went wrong", errors = [], data = null) {
super(message);
this.name = "ApiError";
this.statusCode = statusCode;
this.errors = errors;
this.data = data;
this.success = false;
Error.captureStackTrace?.(this, this.constructor);
}
}