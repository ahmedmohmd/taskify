import express from "express";
import usersController from "../controllers/users.controller";

const router = express.Router();

router.get("/:userId", usersController.getSingleUser);
router.patch("/:userId");
router.delete("/:userId");

export default router;
