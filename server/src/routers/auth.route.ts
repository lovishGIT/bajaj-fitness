import * as authController from "@/controllers/auth.cont.js";
import { Router } from "express";

const router = Router();

router.post('/register', authController.registerController);
router.post('/login', authController.loginController);

export default router;