import { Request, Response } from "express";
import userRepository from "../repository/userRepository";
import adminRepository from "../repository/adminRepository";
import { BadRequest } from "../exceptions/badRequest";
import bcrypt from "bcrypt";

// Create admin
export const adminRegister = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await userRepository.getUserByEmail(email);

  if (user) {
    throw new BadRequest("Not authorized.");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await adminRepository.adminRegister(
    name,
    email,
    hashPassword,
  );

  if (!newUser) {
    throw new BadRequest("Something went wrong.");
  }

  return res.status(201).json("Admin created.");
};


