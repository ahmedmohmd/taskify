import { NextFunction, Request, Response } from "express";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

const validateEmail = (
  { body }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!isEmail(body?.email) || !body.email) {
      return res.status(400).json({
        message: "Invalid email!",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const validatePassword = (
  { body }: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      isStrongPassword(body?.password, {
        minLength: 8,
      })
    ) {
      return res.status(400).json({
        message: "Invalid Password!",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default { validateEmail, validatePassword };
