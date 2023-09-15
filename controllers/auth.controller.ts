import { NextFunction, Request, Response } from "express";
import prisma from "../db/prismaClient";
import jwtUtil from "../utils/jwt.util";

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
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const token = await jwtUtil.generateWebToken({
      name: user.name,
      email: user.email,
    });

    res.json({
      token: token,
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

    const token = await jwtUtil.generateWebToken({
      name: user.name,
      email: user.email,
    });

    res.json({
      user: user,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

export default { login, register };
