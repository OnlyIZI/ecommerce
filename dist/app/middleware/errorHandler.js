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

// src/app/middleware/errorHandler.ts
var errorHandler_exports = {};
__export(errorHandler_exports, {
  errorHandler: () => errorHandler
});
module.exports = __toCommonJS(errorHandler_exports);
var errorHandler = (err, req, res, next) => {
  const status = err.status ?? 500;
  const message = err.message || "INTERNAL SERVER ERROR";
  return res.status(status).json({ message });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  errorHandler
});
