/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequest } from "exceptions/badRequest";
import { NotFound } from "exceptions/notFound";
import { Request, Response } from "express";
import userRepository from "repository/userRepository";

// Register
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

// Get user
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.body;

  const user = await userRepository.getUserById(id);

  if (!user) {
    throw new NotFound("User or password incorrect.");
  }

  return res.status(200).json(user);
};

// Update
export const updateUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    throw new BadRequest("User or password incorrect.");
  }

  const userToUpdate = await userRepository.updateUser(name, email, password);

  const { password: _, ...data } = userToUpdate;

  return res.status(200).json(data);
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  const id = req.body;

  const user = await userRepository.deleteUser(id);

  if (!user) {
    throw new BadRequest("Something went wrong, User not deleted.");
  }

  res.clearCookie("auth");

  return res.status(200).json("Deleted.");
};
