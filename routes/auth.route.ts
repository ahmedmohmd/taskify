import express from "express";
import authController from "../controllers/auth.controller";
import upload from "../middlewares/upload.middleware";
import validateMiddleware from "../middlewares/validate.middleware";

const router = express.Router();

router.post(
  "/login",
  validateMiddleware.validateEmail,
  validateMiddleware.validatePassword,
  authController.login
);

router.post(
  "/register",
  upload.single("image"),
  validateMiddleware.validateEmail,
  validateMiddleware.validatePassword,
  authController.register
);

export default router;
