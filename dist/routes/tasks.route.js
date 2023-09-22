"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_controller_1 = __importDefault(require("../controllers/tasks.controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.get("/", auth_middleware_1.default.authUser, tasks_controller_1.default.getTasks);
router.get("/:taskId", auth_middleware_1.default.authUser, tasks_controller_1.default.getSingleTask);
router.post("/", auth_middleware_1.default.authUser, tasks_controller_1.default.createTask);
router.patch("/:taskId", auth_middleware_1.default.authUser, tasks_controller_1.default.updateTask);
router.delete("/:taskId", auth_middleware_1.default.authUser, tasks_controller_1.default.deleteTask);
exports.default = router;
