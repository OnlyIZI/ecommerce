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

// src/app/middleware/validate.ts
var validate_exports = {};
__export(validate_exports, {
  validate: () => validate
});
module.exports = __toCommonJS(validate_exports);
var validate = (schema) => (req, res, next) => {
  const input = schema.safeParse(req.body);
  if (!input.success) {
    return res.status(400).json(input.error.issues[0].message);
  }
  res.locals = input;
  next();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  validate
});
