"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.get("/:userId", auth_middleware_1.default.authUser, users_controller_1.default.getSingleUser);
router.patch("/:userId", auth_middleware_1.default.authUser, users_controller_1.default.updateUser);
router.delete("/:userId", auth_middleware_1.default.authUser, users_controller_1.default.deleteUser);
exports.default = router;
