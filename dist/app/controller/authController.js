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

// src/app/controller/authController.ts
var authController_exports = {};
__export(authController_exports, {
  login: () => login
});
module.exports = __toCommonJS(authController_exports);

// src/app/exceptions/httpExceptions.ts
var HttpException = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
};

// src/app/exceptions/notFound.ts
var NotFound = class extends HttpException {
  constructor(message) {
    super(404, message);
  }
};

// src/app/exceptions/badRequest.ts
var BadRequest = class extends HttpException {
  constructor(message) {
    super(400, message);
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

// src/app/controller/authController.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_bcrypt = __toESM(require("bcrypt"));
var login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userRepository_default.getUserByEmail(email);
  if (!user) {
    throw new NotFound("User or password incorrect.");
  }
  const passwordCheck = await import_bcrypt.default.compare(password, user.password);
  if (!passwordCheck) {
    throw new NotFound("User or password incorrect.");
  }
  const { id, name, role } = user;
  const token = import_jsonwebtoken.default.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "3h"
  });
  res.cookie("auth", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    domain: "*"
  });
  return res.status(200).json({ id, name });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  login
});
