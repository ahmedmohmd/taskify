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
const isValidString_util_1 = __importDefault(require("../utils/isValidString.util"));
const protectPassword_util_1 = __importDefault(require("../utils/protectPassword.util"));
const responseStructure_util_1 = require("../utils/responseStructure.util");
const getSingleUser = ({ params }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = params;
    if (!(0, isValidString_util_1.default)(userId)) {
        (0, responseStructure_util_1.errorResponse)(res, 400, "The `taskId` query parameter is required and must not be empty.");
        return;
    }
    try {
        const user = yield prismaClient_1.default.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            (0, responseStructure_util_1.errorResponse)(res, 404, "User not found!");
        }
        (0, responseStructure_util_1.successResponse)(res, 200, user);
    }
    catch (error) {
        next(error);
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { userId } = req.params;
    if (!(0, isValidString_util_1.default)(userId)) {
        (0, responseStructure_util_1.errorResponse)(res, 400, "The `taskId` query parameter is required and must not be empty.");
        return;
    }
    try {
        const updatedUser = yield prismaClient_1.default.user.update({
            where: {
                id: userId,
            },
            data: {
                name: (_a = req.body) === null || _a === void 0 ? void 0 : _a.name,
                password: yield protectPassword_util_1.default.encrypt((_b = req.body) === null || _b === void 0 ? void 0 : _b.password),
            },
        });
        (0, responseStructure_util_1.successResponse)(res, 200, updatedUser);
    }
    catch (error) {
        next(error);
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!(0, isValidString_util_1.default)(userId)) {
        (0, responseStructure_util_1.errorResponse)(res, 400, "The `taskId` query parameter is required and must not be empty.");
        return;
    }
    try {
        yield prismaClient_1.default.user.delete({
            where: {
                id: userId,
            },
        });
        (0, responseStructure_util_1.successResponse)(res, 204);
    }
    catch (error) {
        next(error);
    }
});
exports.default = { getSingleUser, updateUser, deleteUser };
