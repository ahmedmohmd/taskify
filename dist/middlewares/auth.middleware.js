"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../db/prismaClient"));
const jwt_util_1 = __importDefault(require("../utils/jwt.util"));
const authUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({ message: "Sorry, you are not logged in!" });
        }
        const token = authHeader.split(" ")[1];
        const decodedToken = yield jwt_util_1.default.verifyWebToken(token);
        if (!decodedToken || typeof decodedToken === "string") {
            return res.status(403).json({ message: "Sorry, are not Authunticated!" });
        }
        const targetUser = prismaClient_1.default.user.findUnique({
            where: { email: decodedToken.email, id: decodedToken.id },
        });
        if (!targetUser) {
            return res.status(403).json({ message: "User not Found!" });
        }
        Object.defineProperty(req, "user", {
            value: decodedToken,
        });
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
    authUser,
};
