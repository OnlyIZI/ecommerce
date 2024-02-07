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

// src/app/repository/adminRepository.ts
var adminRepository_exports = {};
__export(adminRepository_exports, {
  default: () => adminRepository_default
});
module.exports = __toCommonJS(adminRepository_exports);

// src/app/lib/Prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/app/repository/adminRepository.ts
var adminRepository = class {
  async adminRegister(name, email, password) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: "admin"
      }
    });
    return user;
  }
};
var adminRepository_default = new adminRepository();
