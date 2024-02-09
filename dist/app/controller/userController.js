"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/app/controller/userController.ts
var userController_exports = {};
__export(userController_exports, {
  deleteUser: () => deleteUser,
  getUserById: () => getUserById,
  register: () => register,
  updateUser: () => updateUser
});
module.exports = __toCommonJS(userController_exports);

// src/app/exceptions/httpExceptions.ts
var HttpException = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
};

// src/app/exceptions/badRequest.ts
var BadRequest = class extends HttpException {
  constructor(message) {
    super(400, message);
  }
};

// src/app/exceptions/notFound.ts
var NotFound = class extends HttpException {
  constructor(message) {
    super(404, message);
  }
};

// src/app/lib/Prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/app/repository/userRepository.ts
var userRepository = class {
  // Register User
  async register(name, email, password) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });
    return user;
  }
  // Get User by id
  async getUserById(id) {
    return await prisma.user.findUnique({ where: { id } });
  }
  // Get user by email
  async getUserByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
  }
  // Update user
  async updateUser(name, email, password) {
    const user = await prisma.user.update({
      where: {
        email
      },
      data: {
        name,
        password
      }
    });
    return user;
  }
  // Delete User
  async deleteUser(id) {
    const user = await prisma.user.delete({ where: { id } });
    if (!user) {
      throw new BadRequest("User not exist.");
    }
    return user;
  }
};
var userRepository_default = new userRepository();

// src/app/controller/userController.ts
var import_bcrypt = __toESM(require("bcrypt"));
var register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userRepository_default.getUserByEmail(email);
  if (user) {
    throw new BadRequest("User or password incorrect.");
  }
  const hashPassword = await import_bcrypt.default.hash(password, 10);
  const newUser = await userRepository_default.register(name, email, hashPassword);
  if (!newUser) {
    throw new BadRequest("Something went wrong.");
  }
  return res.status(201).json("Registered.");
};
var getUserById = async (req, res) => {
  const { id } = req.payload;
  const user = await userRepository_default.getUserById(id);
  if (!user) {
    throw new NotFound("User or password incorrect.");
  }
  const { name, email } = user;
  return res.status(200).json({ name, email });
};
var updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userRepository_default.getUserByEmail(email);
  if (!user) {
    throw new BadRequest("User or password incorrect.");
  }
  const userToUpdate = await userRepository_default.updateUser(name, email, password);
  const { password: _, ...data } = userToUpdate;
  return res.status(200).json(data);
};
var deleteUser = async (req, res) => {
  const { id } = req.payload;
  const user = await userRepository_default.deleteUser(id);
  if (!user) {
    throw new BadRequest("Something went wrong, User not deleted.");
  }
  res.clearCookie("auth");
  return res.status(200).json("Deleted.");
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteUser,
  getUserById,
  register,
  updateUser
});
