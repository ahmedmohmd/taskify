import { NextFunction, Request, Response } from "express";
import fs from "fs";
import prisma from "../db/prismaClient";
import isValidString from "../utils/isValidString.util";
import protectPasswordUtil from "../utils/protectPassword.util";

import path from "path";
import removeImage from "../utils/removeImage.util";
import {
  errorResponse,
  successResponse,
} from "../utils/responseStructure.util";

const getSingleUser = async (
  { params }: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = params;

  if (!isValidString(userId)) {
    errorResponse(
      res,
      400,
      "The `taskId` query parameter is required and must not be empty."
    );
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      errorResponse(res, 404, "User not found!");
    }

    successResponse(res, 200, user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  if (!isValidString(userId)) {
    errorResponse(
      res,
      400,
      "The `taskId` query parameter is required and must not be empty."
    );
    return;
  }

  if (req.file) {
    const targetUser = await prisma.user.findUnique({
      where: {
        id: req.params.userId,
      },

      select: {
        image: true,
      },
    });

    if (targetUser?.image) {
      removeImage({ filename: targetUser.image.split("/")[2] });
    }
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: req.body?.name,
        password: req.body.password
          ? await protectPasswordUtil.encrypt(req.body?.password)
          : undefined,
        image: req.file ? `/images/${req.file?.filename}` : undefined,
      },
    });

    successResponse(res, 200, updatedUser);
  } catch (error) {
    if (req.file) removeImage(req.file);

    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  if (!isValidString(userId)) {
    errorResponse(
      res,
      400,
      "The `taskId` query parameter is required and must not be empty."
    );
    return;
  }

  try {
    const targetUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    removeImage({
      filename: targetUser.image.split("/")[2],
    });

    successResponse(res, 204);
  } catch (error) {
    next(error);
  }
};

export default { getSingleUser, updateUser, deleteUser };
