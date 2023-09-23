import { Request } from "express";
import type { Task } from "./tasks.types";

interface SubTask {
  id: number;
  title: string;
  description: string;
  primaryTask: Task;
  taskId: string;
  done: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CustomSubTasksRequest extends Request {
  query: {
    taskId: string;
  };
}

export { CustomSubTasksRequest, SubTask };
