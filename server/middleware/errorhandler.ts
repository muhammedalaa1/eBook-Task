import mongoose from "mongoose";
import { APIError } from "../errors";
import type { Request, Response, NextFunction } from "express";

const errorhandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      message: err.message,
      stackTrace: err.stack,
    });
  }

  console.log(err);

  return res.status(500).json({
    message: "UnExpected Error, try more.",
  });
};

export default errorhandler;
