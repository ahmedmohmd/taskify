"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateWebToken = (data) => {
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET_KEY);
};
const verifyWebToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
};
exports.default = { generateWebToken, verifyWebToken };
