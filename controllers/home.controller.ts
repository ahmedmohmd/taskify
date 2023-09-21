import { Request, Response } from "express";

const home = (_: Request, res: Response) => {
  res.json({ message: "Taskify Official API" });
};

export default { home };
