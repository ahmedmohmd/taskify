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
const getAllSubTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const taskId = (_a = req.query) === null || _a === void 0 ? void 0 : _a.taskId;
    if (!(0, isValidString_util_1.default)(taskId)) {
        (0, responseStructure_util_1.errorResponse)(res, 400, "The `taskId` query parameter is required and must not be empty.");
        return;
    }
    try {
        const subTasks = yield prismaClient_1.default.subTask.findMany({
            where: {
                taskId: taskId,
            },
        });
        if (!subTasks) {
            return res.status(404).json({
                message: "SubTasks not found!",
            });
        }
        res.json({
            subTasks: subTasks,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleSubTask = ({ params, query }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = query;
    if (!(0, isValidString_util_1.default)(taskId)) {
        (0, responseStructure_util_1.errorResponse)(res, 400, "The `taskId` query parameter is required and must not be empty.");
        return;
    }
    const { subTaskId } = params;
    if (!(0, isValidString_util_1.default)(subTaskId)) {
        if (!(0, isValidString_util_1.default)(subTaskId)) {
            (0, responseStructure_util_1.errorResponse)(res, 400, "The `subTaskId` parameter is required.");
        }
    }
    try {
        const subTask = yield prismaClient_1.default.subTask.findUnique({
            where: {
                id: +subTaskId,
                taskId: taskId,
            },
        });
        if (!subTask) {
            return res.status(404).json({
                message: "Sub Task not found",
            });
        }
        (0, responseStructure_util_1.successResponse)(res, 200, subTask);
    }
    catch (error) {
        next(error);
    }
});
const createSubTask = ({ body, query }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = query;
    if (!(0, isValidString_util_1.default)(taskId)) {
        (0, responseStructure_util_1.errorResponse)(res, 400, "The `taskId` query parameter is required and must not be empty.");
        return;
    }
    const { title, description, done, labels, deadline } = body;
    const isValidTitle = (0, isValidString_util_1.default)(title);
    const isValidDescription = (0, isValidString_util_1.default)(description);
    if (!isValidTitle || !isValidDescription) {
        (0, responseStructure_util_1.errorResponse)(res, 400, "The `title` and `description`  fields are required and must not be empty.");
        return;
    }
    try {
        let createdSubTask = yield prismaClient_1.default.subTask.create({
            data: {
                title,
                description,
                taskId,
                done,
            },
        });
        (0, responseStructure_util_1.successResponse)(res, 200, createdSubTask);
    }
    catch (error) {
        next(error);
    }
});
const updateSubTask = ({ params, query, body }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { subTaskId } = params;
    if (!(0, isValidString_util_1.default)(subTaskId)) {
        (0, responseStructure_util_1.errorResponse)(res, 400, "The `subTaskId` parameter is required.");
    }
    const { taskId } = query;
    if (!(0, isValidString_util_1.default)(taskId)) {
        (0, responseStructure_util_1.errorResponse)(res, 400, "The `taskId` query parameter is required and must not be empty.");
        return;
    }
    const { title, description, done } = body;
    try {
        const updatedSubTask = yield prismaClient_1.default.subTask.update({
            where: {
                id: +subTaskId,
                taskId: taskId,
            },
            data: {
                title,
                description,
                done,
            },
        });
        (0, responseStructure_util_1.successResponse)(res, 200, updatedSubTask);
    }
    catch (error) {
        next(error);
    }
});
const deleteSubTask = ({ params, query }, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { subTaskId } = params;
    if (!(0, isValidString_util_1.default)(subTaskId)) {
        if (!(0, isValidString_util_1.default)(subTaskId)) {
            (0, responseStructure_util_1.errorResponse)(res, 400, "The `subTaskId` parameter is required.");
        }
    }
    const { taskId } = query;
    if (!(0, isValidString_util_1.default)(taskId)) {
        (0, responseStructure_util_1.errorResponse)(res, 400, "The `taskId` query parameter is required and must not be empty.");
        return;
    }
    try {
        yield prismaClient_1.default.subTask.delete({
            where: {
                id: +subTaskId,
                taskId,
            },
        });
        (0, responseStructure_util_1.successResponse)(res, 204);
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
    getAllSubTasks,
    getSingleSubTask,
    deleteSubTask,
    updateSubTask,
    createSubTask,
};
