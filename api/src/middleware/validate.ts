import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const input = schema.safeParse(req.body);

    if (!input.success) {
      return res.status(400).json(input.error.issues[0].message);
    }

    res.locals = input;
    next();
  };
