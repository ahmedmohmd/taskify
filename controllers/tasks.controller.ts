import { NextFunction, Request, Response } from "express";
import prisma from "../db/prismaClient";
import { CustomTasksRequest } from "../types/tasks.types";
import isValidString from "../utils/isValidString.util";
import {
  errorResponse,
  successResponse,
} from "../utils/responseStructure.util";

const getTasks = async (
  req: CustomTasksRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        ownerId: req.user.id,
      },
      include: {
        subtasks: true,
      },
    });

    if (!tasks) {
      errorResponse(res, 404, "Task not found.");
    }

    successResponse(res, 200, tasks);
  } catch (error) {
    next(error);
  }
};

const getSingleTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskId = req.params.taskId;
  if (!isValidString(taskId)) {
    errorResponse(res, 400, "The `taskId` parameter is required.");
  }

  try {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      errorResponse(res, 404, "Task not found.");
    }

    successResponse(res, 200, task);
  } catch (error) {
    next(error);
  }
};

const createTask = async (
  { body, user }: CustomTasksRequest,
  res: Response,
  next: NextFunction
) => {
  const { title, description } = body;
  const isValidTitle = isValidString(title);
  const isValidDescription = isValidString(description);

  if (!isValidTitle || !isValidDescription) {
    errorResponse(
      res,
      400,
      "The `title` and `description`  fields are required and must not be empty."
    );
  }

  const { id } = user;

  try {
    const createdTask = await prisma.task.create({
      data: {
        title,
        description,
        ownerId: id,
      },
    });

    successResponse(res, 201, createdTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (
  { params, body }: Request,
  res: Response,
  next: NextFunction
) => {
  const { taskId } = params;
  if (!isValidString(taskId)) {
    errorResponse(res, 400, "The `taskId` parameter is required.");
  }

  const { title, description } = body;

  const isValidTitle = isValidString(title);
  const isValidDescription = isValidString(description);

  if (!isValidTitle || !isValidDescription) {
    errorResponse(
      res,
      400,
      "The `title` and `description`  fields are required and must not be empty."
    );
  }

  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        description,
      },
    });

    successResponse(res, 200, updatedTask);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const { taskId } = req.params;
  if (!isValidString(taskId)) {
    errorResponse(res, 400, "The `taskId` parameter is required.");
  }

  try {
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    successResponse(res, 204);
  } catch (error) {
    next(error);
  }
};

export default {
  getTasks,
  getSingleTask,
  deleteTask,
  updateTask,
  createTask,
};
