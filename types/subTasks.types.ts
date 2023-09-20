import { Request } from "express";
import type { Task } from "./tasks.types";
import { User } from "./users.types";

interface SubTask {
  id: number;
  title: string;
  description: string;
  primaryTask: Task;
  taskId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CustomSubTasksRequest extends Request {
  query: {
    taskId: string;
  };
}
// type CustomSubTasksRequest = Request | { query: { taskId: string } };

export { CustomSubTasksRequest, SubTask };
