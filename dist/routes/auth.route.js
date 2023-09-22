"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const router = express_1.default.Router();
router.post("/login", validate_middleware_1.default.validateEmail, validate_middleware_1.default.validatePassword, auth_controller_1.default.login);
router.post("/register", validate_middleware_1.default.validateEmail, validate_middleware_1.default.validatePassword, auth_controller_1.default.register);
exports.default = router;
