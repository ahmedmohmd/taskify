import type { Task } from "./tasks.types";

interface SubTask {
  id: number;
  title: string;
  description: string;
  primaryTask: Task;
  taskId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export { SubTask };
