import { NextFunction, Request, Response } from "express";
import prisma from "../db/prismaClient";
import jwtUtil from "../utils/jwt.util";
import protectPasswordUtil from "../utils/protectPassword.util";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
      select: {
        name: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

  const checkPassword = await protectPasswordUtil.check(
      req.body.password,
      user.password
    );

    if (!checkPassword) {
      return res.status(404).json({
        message: "Your password is incorrect!",
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
    const hashedPassword = await protectPasswordUtil.encrypt(body.password);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
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
