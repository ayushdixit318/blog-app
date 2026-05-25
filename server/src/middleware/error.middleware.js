import { ZodError } from "zod";
import { env } from "../config/env.js";

export function notFound(req, _res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

export function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;
  const payload = {
    message: error.message || "Server error"
  };

  if (error instanceof ZodError) {
    payload.message = "Validation failed";
    payload.details = error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message
    }));
    return res.status(400).json(payload);
  }

  if (error.name === "CastError") {
    payload.message = "Invalid resource identifier";
    return res.status(400).json(payload);
  }

  if (error.code === 11000) {
    payload.message = "A record with that value already exists";
    return res.status(409).json(payload);
  }

  if (env.NODE_ENV !== "production") {
    payload.stack = error.stack;
    payload.details = error.details || null;
  }

  res.status(statusCode).json(payload);
}
