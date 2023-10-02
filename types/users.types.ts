import { Task } from "./tasks.types";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  tasks?: Task[];
  image: string;
}

export { User };
