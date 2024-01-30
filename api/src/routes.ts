import Router from "express";
import "express-async-errors";
import { isAuthenticated } from "middleware/Auth";
import { validate } from "middleware/validate";
import { schema } from "validations";
import * as userController from "./controller/userController";
import * as authController from "./controller/authController";
import * as adminController from "./controller/adminController";

export const routes = Router();

// Auth controller
routes.post("/login", validate(schema.login), authController.login);

// User controller
routes.post(
  "/user/register",
  validate(schema.register),
  userController.register,
);
routes.get("/get", isAuthenticated, userController.getUserById);
routes.put(
  "/user/update",
  validate(schema.register),
  isAuthenticated,
  userController.updateUser,
);
routes.delete("/user/delete", isAuthenticated, userController.deleteUser);

// Admin Controller
routes.post(
  "/admin/register",
  validate(schema.register),
  adminController.adminRegister,
);
// !!! update, delete use user controller
