import express from "express";
import authController from "../controllers/auth.controller";
import upload from "../middlewares/upload.middleware";
import validateMiddleware from "../middlewares/validate.middleware";

const router = express.Router();

// router.post(
//   "/login/admin",

//   authController.loginAdmin
// );

router.post("/login/student", authController.loginStudent);

// router.post("/login/instructor", authController.loginInstructor);

router.post(
  "/register",
  upload.single("image"),
  validateMiddleware.validateEmail,
  validateMiddleware.validatePassword,
  authController.register
);

export default router;
