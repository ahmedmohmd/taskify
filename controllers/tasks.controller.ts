import type { NextFunction, Request, Response } from "express";
import isDate from "validator/lib/isDate";
import prisma from "../db/prismaClient";
import isValidString from "../utils/isValidString.util";
import {
  errorResponse,
  successResponse,
} from "../utils/responseStructure.util";

const getTasks = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  // All Received Labels
  const labels = req.query.labels ? req.query.labels.split(",") : undefined;
  const done = req.query.done === "true" ? true : false;
  const limit = req.query.limit ? +req.query.limit : undefined;
  const skip = req.query.skip ? +req.query.skip : undefined;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        ownerId: req.user.id,
        done,
      },
      include: {
        subtasks: true,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!tasks) {
      errorResponse(res, 404, "Tasks not found.");
    }

    if (labels && labels.length > 0) {
      const filteredTasks = tasks.filter((task) => {
        return labels.every((label: string) => {
          return task.labels?.includes(label.trim());
        });
      });

      successResponse(res, 200, filteredTasks);
      return;
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
    return;
  }

  try {
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      errorResponse(res, 404, "Task not found.");
      return;
    }

    successResponse(res, 200, task);
  } catch (error) {
    next(error);
  }
};

const createTask = async (
  { body, user }: Request | any,
  res: Response,
  next: NextFunction
) => {
  const { title, description, labels, deadline } = body;
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

  if (deadline && !isDate(deadline)) {
    errorResponse(res, 400, "`deadline` field must be a valid date.");
    return;
  }

  const { id } = user;

  try {
    const createdTask = await prisma.task.create({
      data: {
        title,
        description,
        labels,
        deadline,
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
    return;
  }

  const { title, description, done, deadline } = body;

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

  if (deadline && !isDate(deadline)) {
    errorResponse(res, 400, "`deadline` field must be a valid date.");
    return;
  }

  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        description,
        deadline,
        done,
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
    return;
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
