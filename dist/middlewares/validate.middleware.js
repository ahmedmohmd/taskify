"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const isStrongPassword_1 = __importDefault(require("validator/lib/isStrongPassword"));
const validateEmail = ({ body }, res, next) => {
    try {
        if (!(0, isEmail_1.default)(body === null || body === void 0 ? void 0 : body.email) || !body.email) {
            return res.status(400).json({
                message: "Invalid email!",
            });
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
const validatePassword = ({ body }, res, next) => {
    try {
        if ((0, isStrongPassword_1.default)(body === null || body === void 0 ? void 0 : body.password, {
            minLength: 8,
        })) {
            return res.status(400).json({
                message: "Invalid Password!",
            });
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = { validateEmail, validatePassword };
