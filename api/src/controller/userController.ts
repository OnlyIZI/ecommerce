import { BadRequest } from "exceptions/badRequest";
import { Request, Response } from "express";
import userRepository from "repository/userRepository";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await userRepository.getUserByEmail(email);

  if (user) {
    throw new BadRequest("User or password incorrect.");
  }

  // const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await userRepository.register(name, email, password);

  return res.status(201).json(newUser);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await userRepository.getUserById(id);

  return res.status(200).json(user);
};
