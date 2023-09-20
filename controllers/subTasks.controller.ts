import { NextFunction, Request, Response } from "express";
import prisma from "../db/prismaClient";
import { SubTask } from "../types/subTasks.types";

const getSubTasks = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const taskId = req.query?.taskId;

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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskId = req.query?.taskId;
  const subTaskId = req.params.subTaskId;

  try {
    const subTask = await prisma.subTask.findUnique({
      where: {
        id: +subTaskId,
        taskId: taskId?.toString(),
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
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.query?.taskId;

    let createdSubTask = await prisma.subTask.create({
      data: {
        title: req.body?.title,
        description: req.body?.description,
        taskId: taskId,
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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { subTaskId } = req.params;
    const taskId = req.query?.taskId;

    const updatedSubTask = await prisma.subTask.update({
      where: {
        id: +subTaskId,
        taskId: taskId?.toString(),
      },

      data: {
        title: req.body?.title,
        description: req.body?.description,
      },
    });

    res.json({
      updatedTask: updatedSubTask,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSubTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { subTaskId } = req.params;
    const taskId = req.query?.taskId;

    await prisma.subTask.delete({
      where: {
        id: +subTaskId,
        taskId: taskId?.toString(),
      },
    });

    res.json("Sub Task deleted successfully.");
  } catch (error) {
    next(error);
  }
};

export default {
  getSubTasks,
  getSingleSubTask,
  deleteSubTask,
  updateSubTask,
  createSubTask,
};
