import { SubTask } from "./subTasks.types";

interface Task {
  id: string;
  title: string;
  description?: string;
  owner?: string;
  ownerId: string;
  subTasks?: SubTask[];
  createdAt?: Date;
  updatedAt?: Date;
}

export { Task };
