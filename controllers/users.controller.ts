import { NextFunction, Request, Response } from "express";
import prisma from "../db/prismaClient";
import isValidString from "../utils/isValidString.util";
import protectPasswordUtil from "../utils/protectPassword.util";

const getSingleUser = async (
  { params }: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = params;

  if (!isValidString(userId)) {
    return res.status(400).json({
      error: "The `taskId` query parameter is required and must not be empty.",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    res.json({
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  if (!isValidString(userId)) {
    return res.status(400).json({
      error: "The `taskId` query parameter is required and must not be empty.",
    });
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: req.body?.name,
        password: await protectPasswordUtil.encrypt(req.body?.password),
      },
    });

    res.json("User Updated Successfully.");
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  if (!isValidString(userId)) {
    return res.status(400).json({
      error: "The `taskId` query parameter is required and must not be empty.",
    });
  }

  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    res.json("User deleted successfully");
  } catch (error) {
    next(error);
  }
};

export default { getSingleUser, updateUser, deleteUser };
