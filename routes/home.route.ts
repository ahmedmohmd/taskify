import express from "express";
import homeController from "../controllers/home.controller";

const router = express.Router();

router.get("/", homeController.home);

export default router;
