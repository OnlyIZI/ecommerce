"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/app/repository/userRepository.ts
var userRepository_exports = {};
__export(userRepository_exports, {
  default: () => userRepository_default
});
module.exports = __toCommonJS(userRepository_exports);

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
