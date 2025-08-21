import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import * as questionController from "../controllers/question.controller";
import { validate } from "../middlewares/validate.middleware";
import { questionSchema } from "../schemas/question.schema";

const router = Router();

router.post(
  "/question",
  protect,
  validate(questionSchema),
  questionController.createQuestion
);

router.get("/questions", questionController.getQuestions);

router.get("/question/:id", questionController.getQuestionById);

export default router;
