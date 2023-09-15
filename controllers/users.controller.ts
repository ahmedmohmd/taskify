import { NextFunction, Request, Response } from "express";
import prisma from "../db/prismaClient";
import protectPasswordUtil from "../utils/protectPassword.util";

const getSingleUser = async (
  { params }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = params;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: req.body?.name,
        password: await protectPasswordUtil.encrypt(req.body?.password),
      },
    });

    res.json("User Updated Successfully");
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

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
