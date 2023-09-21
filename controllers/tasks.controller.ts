import { NextFunction, Request, Response } from "express";
import prisma from "../db/prismaClient";

const getTasks = async (
  req: Request | any,
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
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      tasks: tasks,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.params.taskId;

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      task: task,
    });
  } catch (error) {
    next(error);
  }
};

const createTask = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    let createdTask = await prisma.task.create({
      data: {
        title: req.body?.title,
        description: req.body?.description,
        ownerId: req.user.id,
      },
    });

    res.json({
      task: createdTask,
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;

    const targetTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title: req.body?.title,
        description: req.body?.description,
      },
    });

    res.json({
      updatedTask: targetTask,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    res.json("Task deleted successfully.");
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
