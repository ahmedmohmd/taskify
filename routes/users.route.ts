import express from "express";
import usersController from "../controllers/users.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/:userId", authMiddleware.authUser, usersController.getSingleUser);
router.patch("/:userId", authMiddleware.authUser, usersController.updateUser);
router.delete("/:userId", authMiddleware.authUser, usersController.deleteUser);

export default router;
