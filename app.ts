import cors from "cors";
import "dotenv/config";
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import authRouter from "./routes/auth.route";
import homeRouter from "./routes/home.route";
import subTasksRouter from "./routes/subTasks.route";
import tasksRouter from "./routes/tasks.route";
import usersRouter from "./routes/users.route";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use("/api/", homeRouter);
app.use("/api/auth/", authRouter);
app.use("/api/users/", usersRouter);
app.use("/api/tasks/", tasksRouter);
app.use("/api/subtasks/", subTasksRouter);

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  console.error(err);
  return res.status(500).json({
    message: err.message,
  });
});

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}...`);
});
