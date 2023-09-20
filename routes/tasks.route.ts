import express from "express";
import tasksController from "../controllers/tasks.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware.authUser, tasksController.getTasks);
router.get("/:taskId", authMiddleware.authUser, tasksController.getSingleTask);
router.post("/", authMiddleware.authUser, tasksController.createTask);
router.patch("/:taskId", authMiddleware.authUser, tasksController.updateTask);
router.delete("/:taskId", authMiddleware.authUser, tasksController.deleteTask);

export default router;
