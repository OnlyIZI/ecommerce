import { NotFound } from "exceptions/notFound";
import { Request, Response } from "express";
import userRepository from "repository/userRepository";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    throw new NotFound("User or password incorrect.");
  }


  const { id, name, role } = user;

  const token = jwt.sign({ id, role }, process.env.JWT_SECRET as string);

  res.cookie("auth", token);
  return res.status(200).json({ id, name });
};
