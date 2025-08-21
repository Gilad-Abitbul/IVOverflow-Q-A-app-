import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import * as answerController from "../controllers/answer.controller";
import { validate } from "../middlewares/validate.middleware";
import { answerSchema } from "../schemas/answer.schema";

const router = Router();

router.get("/getQuestionAnswers/:id", answerController.getAnswersByQuestionId);

router.post(
  "/:id/answer",
  protect,
  validate(answerSchema),
  answerController.createAnswer
);

export default router;
