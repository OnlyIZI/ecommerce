import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface IPayload {
  id: string;
  role: string;
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.auth;

    const { id, role } = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as IPayload;

    req.payload = { id, role };

    next();
  } catch (err) {
    res.clearCookie("auth");
    return res.status(401).json("Token invalid.");
  }
};
