import { Response } from "express";

const successResponse = (
  res: Response,
  statusCode: number = 200,
  data: any = null
) => {
  if (statusCode === 200 && data) {
    return res.status(statusCode).json({ success: true, data });
  }

  res.status(statusCode).send();
};

const errorResponse = (res: Response, statusCode: number, message: string) => {
  return res.status(statusCode).json({ success: false, message });
};

export { errorResponse, successResponse };
