import { NextFunction, Request, Response } from "express";
import validtor from "validator";
import prisma from "../db/prismaClient";

const login = async ({ body }: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
      select: {
        name: true,
        email: true,
      },
    });

    if (!user) {
      res.status(404).json({
        message: "User not found!",
      });
    }

    res.json({
      user: user,
    });

    res.json({
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (
  { body }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    res.json({
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

export default { login, register };
