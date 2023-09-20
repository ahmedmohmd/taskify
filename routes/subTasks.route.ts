import express from "express";
import subTasksController from "../controllers/subTasks.controller";

const router = express.Router();

router.get("/", subTasksController.getSubTasks);
router.get("/:subTaskId", subTasksController.getSingleSubTask);
router.post("/", subTasksController.createSubTask);
router.patch("/:subTaskId", subTasksController.updateSubTask);
router.delete("/:subTaskId", subTasksController.deleteSubTask);

export default router;
