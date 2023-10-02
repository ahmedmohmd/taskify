import express from "express";
import usersController from "../controllers/users.controller";
import authMiddleware from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";

const router = express.Router();

router.get("/:userId", authMiddleware.authUser, usersController.getSingleUser);
router.patch(
  "/:userId",
  upload.single("image"),
  authMiddleware.authUser,
  usersController.updateUser
);
router.delete("/:userId", authMiddleware.authUser, usersController.deleteUser);

export default router;
