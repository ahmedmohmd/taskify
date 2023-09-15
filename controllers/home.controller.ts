import { Request, Response } from "express";

const home = (req: Request, res: Response) => {
  res.json({ message: "Taskify Offecial API" });
};

export default { home };
