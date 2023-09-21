import { SubTask } from "./subTasks.types";
import { User } from "./users.types";

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

interface CustomTasksRequest extends Request {
  user: User;
  body: any;
}

export { CustomTasksRequest, Task };
