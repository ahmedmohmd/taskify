import { NextFunction, Request, Response } from "express";
import prisma from "../db/prismaClient";
import jwtUtil from "../utils/jwt.util";
import protectPasswordUtil from "../utils/protectPassword.util";
import {
  errorResponse,
  successResponse,
} from "../utils/responseStructure.util";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      errorResponse(res, 404, "User not found!");
      return;
    }

    const checkPassword = await protectPasswordUtil.check(
      req.body.password,
      user.password
    );

    if (!checkPassword) {
      errorResponse(res, 404, "Your password is incorrect!");
      return;
    }

    const token = await jwtUtil.generateWebToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    successResponse(res, 200, token);
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

    successResponse(res, 200, {
      user: user,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

export default { login, register };
