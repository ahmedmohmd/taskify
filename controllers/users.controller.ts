import { Request, Response } from "express";
import prisma from "../db/prismaClient";

const getSingleUser = async ({ params }: Request, res: Response) => {
  try {
    const { userId } = params;

    console.log(userId);
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
    console.error(error);
  }
};

export default { getSingleUser };
