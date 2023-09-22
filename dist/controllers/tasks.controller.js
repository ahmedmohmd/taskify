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
const responseStructure_util_1 = require("../utils/responseStructure.util");
const getTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield prismaClient_1.default.task.findMany({
            where: {
                ownerId: req.user.id,
            },
            include: {
                subtasks: true,
            },
        });
        if (!tasks) {
            (0, responseStructure_util_1.errorResponse)(res, 404, "Task not found.");
        }
        (0, responseStructure_util_1.successResponse)(res, 200, tasks);
    }
    catch (error) {
        next(error);
    }
});
const getSingleTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.taskId;
    if (!(0, isValidString_util_1.default)(taskId)) {
        (0, responseStructure_util_1.errorResponse)(res, 400, "The `taskId` parameter is required.");
        return;
    }
    try {
        const task = yield prismaClient_1.default.task.findUnique({
            where: {
                id: taskId,
            },
        });
        if (!task) {
            (0, responseStructure_util_1.errorResponse)(res, 404, "Task not found.");
            return;
        }
        (0, responseStructure_util_1.successResponse)(res, 200, task);
    }
    catch (error) {
        next(error);
    }
});
const createTask = ({ body, user }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = body;
    const isValidTitle = (0, isValidString_util_1.default)(title);
    const isValidDescription = (0, isValidString_util_1.default)(description);
    if (!isValidTitle || !isValidDescription) {
        return (0, responseStructure_util_1.errorResponse)(res, 400, "The `title` and `description`  fields are required and must not be empty.");
    }
    const { id } = user;
    try {
        const createdTask = yield prismaClient_1.default.task.create({
            data: {
                title,
                description,
                ownerId: id,
            },
        });
        (0, responseStructure_util_1.successResponse)(res, 201, createdTask);
    }
    catch (error) {
        next(error);
    }
});
const updateTask = ({ params, body }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = params;
    if (!(0, isValidString_util_1.default)(taskId)) {
        (0, responseStructure_util_1.errorResponse)(res, 400, "The `taskId` parameter is required.");
        return;
    }
    const { title, description } = body;
    const isValidTitle = (0, isValidString_util_1.default)(title);
    const isValidDescription = (0, isValidString_util_1.default)(description);
    if (!isValidTitle || !isValidDescription) {
        (0, responseStructure_util_1.errorResponse)(res, 400, "The `title` and `description`  fields are required and must not be empty.");
        return;
    }
    try {
        const updatedTask = yield prismaClient_1.default.task.update({
            where: {
                id: taskId,
            },
            data: {
                title,
                description,
            },
        });
        (0, responseStructure_util_1.successResponse)(res, 200, updatedTask);
    }
    catch (error) {
        next(error);
    }
});
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    if (!(0, isValidString_util_1.default)(taskId)) {
        (0, responseStructure_util_1.errorResponse)(res, 400, "The `taskId` parameter is required.");
        return;
    }
    try {
        yield prismaClient_1.default.task.delete({
            where: {
                id: taskId,
            },
        });
        (0, responseStructure_util_1.successResponse)(res, 204);
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
    getTasks,
    getSingleTask,
    deleteTask,
    updateTask,
    createTask,
};
