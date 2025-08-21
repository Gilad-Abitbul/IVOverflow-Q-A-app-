import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, signupSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/login", validate(loginSchema), authController.login);

router.post("/signup", validate(signupSchema), authController.signup);

router.get("/me", protect, authController.me);

export default router;
