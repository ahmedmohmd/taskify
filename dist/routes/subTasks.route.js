"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subTasks_controller_1 = __importDefault(require("../controllers/subTasks.controller"));
const router = express_1.default.Router();
router.get("/", subTasks_controller_1.default.getAllSubTasks);
router.get("/:subTaskId", subTasks_controller_1.default.getSingleSubTask);
router.post("/", subTasks_controller_1.default.createSubTask);
router.patch("/:subTaskId", subTasks_controller_1.default.updateSubTask);
router.delete("/:subTaskId", subTasks_controller_1.default.deleteSubTask);
exports.default = router;
