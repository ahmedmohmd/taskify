import { NextFunction, Request, Response } from "express";
import prisma from "../db/prismaClient";
import jwtUtil from "../utils/jwt.util";

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Sorry, you are not logged in!" });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await jwtUtil.verifyWebToken(token);

    if (!decodedToken || typeof decodedToken === "string") {
      return res.status(403).json({ message: "Sorry, are not Authunticated!" });
    }

    const targetUser = prisma.user.findUnique({
      where: { email: decodedToken.email },
    });

    if (!targetUser) {
      return res.status(403).json({ message: "User not Found!" });
    }

    Object.defineProperty(req, "user", {
      value: decodedToken,
    });

    next();
  } catch (error) {
    next(error);
  }
};

export default {
  authUser,
};
