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
const protectPassword_util_1 = __importDefault(require("../utils/protectPassword.util"));
const responseStructure_util_1 = require("../utils/responseStructure.util");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prismaClient_1.default.user.findUnique({
            where: {
                email: req.body.email,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            },
        });
        if (!user) {
            (0, responseStructure_util_1.errorResponse)(res, 404, "User not found!");
            return;
        }
        const checkPassword = yield protectPassword_util_1.default.check(req.body.password, user.password);
        if (!checkPassword) {
            (0, responseStructure_util_1.errorResponse)(res, 404, "Your password is incorrect!");
            return;
        }
        const token = yield jwt_util_1.default.generateWebToken({
            id: user.id,
            name: user.name,
            email: user.email,
        });
        (0, responseStructure_util_1.successResponse)(res, 200, token);
    }
    catch (error) {
        next(error);
    }
});
const register = ({ body }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield protectPassword_util_1.default.encrypt(body.password);
        const user = yield prismaClient_1.default.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
            },
        });
        const token = yield jwt_util_1.default.generateWebToken({
            name: user.name,
            email: user.email,
        });
        (0, responseStructure_util_1.successResponse)(res, 200, {
            user: user,
            token: token,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = { login, register };
