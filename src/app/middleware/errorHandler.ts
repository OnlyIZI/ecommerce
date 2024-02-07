/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException } from "../exceptions/httpExceptions";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.status ?? 500;
  const message = err.message || "INTERNAL SERVER ERROR";
  return res.status(status).json({ message });
};
