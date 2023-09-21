import { NextFunction, Response } from "express";
import prisma from "../db/prismaClient";
import { CustomSubTasksRequest } from "../types/subTasks.types";
import isValidString from "../utils/isValidString.util";
import {
  errorResponse,
  successResponse,
} from "../utils/responseStructure.util";

const getAllSubTasks = async (
  req: CustomSubTasksRequest,
  res: Response,
  next: NextFunction
) => {
  const taskId = req.query?.taskId;
  if (!isValidString(taskId)) {
    errorResponse(
      res,
      400,
      "The `taskId` query parameter is required and must not be empty."
    );
    return;
  }

  try {
    const subTasks = await prisma.subTask.findMany({
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
  } catch (error) {
    next(error);
  }
};

const getSingleSubTask = async (
  { params, query }: CustomSubTasksRequest,
  res: Response,
  next: NextFunction
) => {
  const { taskId } = query;
  if (!isValidString(taskId)) {
    errorResponse(
      res,
      400,
      "The `taskId` query parameter is required and must not be empty."
    );
    return;
  }

  const { subTaskId } = params;
  if (!isValidString(subTaskId)) {
    if (!isValidString(subTaskId)) {
      errorResponse(res, 400, "The `subTaskId` parameter is required.");
    }
  }

  try {
    const subTask = await prisma.subTask.findUnique({
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

    successResponse(res, 200, subTask);
  } catch (error) {
    next(error);
  }
};

const createSubTask = async (
  { body, query }: CustomSubTasksRequest,
  res: Response,
  next: NextFunction
) => {
  const { taskId } = query;
  if (!isValidString(taskId)) {
    errorResponse(
      res,
      400,
      "The `taskId` query parameter is required and must not be empty."
    );
    return;
  }

  const { title, description, done, labels, deadline } = body;

  const isValidTitle = isValidString(title);
  const isValidDescription = isValidString(description);

  if (!isValidTitle || !isValidDescription) {
    errorResponse(
      res,
      400,
      "The `title` and `description`  fields are required and must not be empty."
    );
    return;
  }

  try {
    let createdSubTask = await prisma.subTask.create({
      data: {
        title,
        description,
        taskId,
        done,
      },
    });

    successResponse(res, 200, createdSubTask);
  } catch (error) {
    next(error);
  }
};

const updateSubTask = async (
  { params, query, body }: CustomSubTasksRequest,
  res: Response,
  next: NextFunction
) => {
  const { subTaskId } = params;
  if (!isValidString(subTaskId)) {
    errorResponse(res, 400, "The `subTaskId` parameter is required.");
  }

  const { taskId } = query;
  if (!isValidString(taskId)) {
    errorResponse(
      res,
      400,
      "The `taskId` query parameter is required and must not be empty."
    );
    return;
  }

  const { title, description, done } = body;

  try {
    const updatedSubTask = await prisma.subTask.update({
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

    successResponse(res, 200, updatedSubTask);
  } catch (error) {
    next(error);
  }
};

const deleteSubTask = async (
  { params, query }: CustomSubTasksRequest,
  res: Response,
  next: NextFunction
) => {
  const { subTaskId } = params;
  if (!isValidString(subTaskId)) {
    if (!isValidString(subTaskId)) {
      errorResponse(res, 400, "The `subTaskId` parameter is required.");
    }
  }

  const { taskId } = query;
  if (!isValidString(taskId)) {
    errorResponse(
      res,
      400,
      "The `taskId` query parameter is required and must not be empty."
    );
    return;
  }

  try {
    await prisma.subTask.delete({
      where: {
        id: +subTaskId,
        taskId,
      },
    });

    successResponse(res, 204);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllSubTasks,
  getSingleSubTask,
  deleteSubTask,
  updateSubTask,
  createSubTask,
};
