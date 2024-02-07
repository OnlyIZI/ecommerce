"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/server.ts
var import_express2 = __toESM(require("express"));
var import_config = require("dotenv/config");

// src/app/middleware/errorHandler.ts
var errorHandler = (err, req, res, next) => {
  const status = err.status ?? 500;
  const message = err.message || "INTERNAL SERVER ERROR";
  return res.status(status).json({ message });
};

// src/server.ts
var import_cookie_parser = __toESM(require("cookie-parser"));

// src/app/routes.ts
var import_express = __toESM(require("express"));
var import_express_async_errors = require("express-async-errors");

// src/app/middleware/Auth.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.auth;
    const { id, role } = import_jsonwebtoken.default.verify(
      token,
      process.env.JWT_SECRET
    );
    req.payload = { id, role };
    next();
  } catch (err) {
    res.clearCookie("auth");
    return res.status(401).json("Token invalid.");
  }
};

// src/app/middleware/validate.ts
var validate = (schema2) => (req, res, next) => {
  const input = schema2.safeParse(req.body);
  if (!input.success) {
    return res.status(400).json(input.error.issues[0].message);
  }
  res.locals = input;
  next();
};

// src/app/validations/loginSchema.ts
var import_zod = __toESM(require("zod"));
var loginSchema = import_zod.default.object({
  email: import_zod.default.string().email("Email not match."),
  password: import_zod.default.string().min(6, "Password must have at least 6 characters.")
});

// src/app/validations/registerSchema.ts
var import_zod2 = __toESM(require("zod"));
var registerSchema = import_zod2.default.object({
  name: import_zod2.default.string().min(3, "Name must have at least 3 characters."),
  email: import_zod2.default.string().email("Email not match."),
  password: import_zod2.default.string().min(6, "Password must have at least 6 characters.")
});

// src/app/validations/index.ts
var schema = {
  register: registerSchema,
  login: loginSchema
};

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
  // Get All User
  async getAllUser() {
    return await prisma.user.findMany();
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
  return res.status(200).json(user);
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

// src/app/controller/authController.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var import_bcrypt2 = __toESM(require("bcrypt"));
var login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userRepository_default.getUserByEmail(email);
  if (!user) {
    throw new NotFound("User or password incorrect.");
  }
  const passwordCheck = await import_bcrypt2.default.compare(password, user.password);
  if (!passwordCheck) {
    throw new NotFound("User or password incorrect.");
  }
  const { id, name, role } = user;
  const token = import_jsonwebtoken2.default.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "3h"
  });
  res.cookie("auth", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 3,
    sameSite: "strict"
  });
  return res.status(200).json({ id, name });
};

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

// src/app/controller/adminController.ts
var import_bcrypt3 = __toESM(require("bcrypt"));
var adminRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userRepository_default.getUserByEmail(email);
  if (user) {
    throw new BadRequest("Not authorized.");
  }
  const hashPassword = await import_bcrypt3.default.hash(password, 10);
  const newUser = await adminRepository_default.adminRegister(
    name,
    email,
    hashPassword
  );
  if (!newUser) {
    throw new BadRequest("Something went wrong.");
  }
  return res.status(201).json("Admin created.");
};

// src/app/routes.ts
var routes = (0, import_express.default)();
routes.post("/login", validate(schema.login), login);
routes.post(
  "/user/register",
  validate(schema.register),
  register
);
routes.get("/get", isAuthenticated, getUserById);
routes.put(
  "/user/update",
  validate(schema.register),
  isAuthenticated,
  updateUser
);
routes.delete("/user/delete", isAuthenticated, deleteUser);
routes.post(
  "/admin/register",
  validate(schema.register),
  adminRegister
);

// src/server.ts
var import_cors = __toESM(require("cors"));
var PORT = process.env.PORT;
var app = (0, import_express2.default)();
app.use(import_express2.default.json());
app.use((0, import_cookie_parser.default)());
app.use((0, import_cors.default)({
  credentials: true,
  origin: "*",
  methods: ["POST", "GET", "PUT", "DELETE"],
  maxAge: 60 * 60 * 3
}));
app.use(routes);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
