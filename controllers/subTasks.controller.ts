import { NextFunction, Response } from "express";
import prisma from "../db/prismaClient";
import { CustomSubTasksRequest } from "../types/subTasks.types";
import isValidString from "../utils/isValidString.util";

const getAllSubTasks = async (
  req: CustomSubTasksRequest,
  res: Response,
  next: NextFunction
) => {
  const taskId = req.query?.taskId;
  if (!isValidString(taskId)) {
    return res.status(400).json({
      error: "The `taskId` query parameter is required and must not be empty.",
    });
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
    return res.status(400).json({
      error: "The `taskId` query parameter is required and must not be empty.",
    });
  }

  const { subTaskId } = params;
  if (!isValidString(subTaskId)) {
    return res.status(400).json({
      error: "The `subTaskId` parameter is required.",
    });
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

    res.json({
      subTask: subTask,
    });
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
    return res.status(400).json({
      error: "The `taskId` query parameter is required and must not be empty.",
    });
  }

  const { title, description } = body;

  const isValidTitle = isValidString(title);
  const isValidDescription = isValidString(description);

  if (!isValidTitle || !isValidDescription) {
    res.status(400).json({
      error:
        "The `title` and `description`  fields are required and must not be empty.",
    });
  }

  try {
    let createdSubTask = await prisma.subTask.create({
      data: {
        title,
        description,
        taskId,
      },
    });

    res.json({
      result: createdSubTask,
    });
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
    return res.status(400).json({
      error: "The `subTaskId` parameter is required.",
    });
  }

  const { taskId } = query;
  if (!isValidString(taskId)) {
    return res.status(400).json({
      error: "The `taskId` query parameter is required and must not be empty.",
    });
  }

  const { title, description } = body;

  try {
    const updatedSubTask = await prisma.subTask.update({
      where: {
        id: +subTaskId,
        taskId: taskId,
      },

      data: {
        title,
        description,
      },
    });

    res.json({
      result: updatedSubTask,
    });
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
    return res.status(400).json({
      error: "The `subTaskId` parameter is required.",
    });
  }

  const { taskId } = query;
  if (!isValidString(taskId)) {
    return res.status(400).json({
      error: "The `taskId` query parameter is required and must not be empty.",
    });
  }

  try {
    await prisma.subTask.delete({
      where: {
        id: +subTaskId,
        taskId,
      },
    });

    res.json("SubTask deleted successfully.");
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
