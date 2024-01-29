import Router from "express";
import "express-async-errors";
import * as userController from "./controller/userController";

export const routes = Router();

routes.post("/user/register", userController.register);
routes.get("/get", userController.getUserById);
