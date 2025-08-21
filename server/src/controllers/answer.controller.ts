import { NextFunction, Request, Response } from "express";
import Question from "../models/Question";
import Answer from "../models/Answer";

export const createAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req.body;
    const { id: qid } = req.params;
    const uid = req.uid;

    const question = await Question.findById(qid);

    if (!question)
      return res.status(404).json({ message: "Question Not Found." });

    const answer = await Answer.create({ body, question: qid, owner: uid });
    res.status(201).json(answer);
  } catch (error) {
    return res.status(500).json({ message: "Server Error." });
  }
};

export const getAnswersByQuestionId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: question } = req.params;

    const answers = await Answer.find({ question })
      .sort({ createdAt: -1 })
      .populate({
        path: "owner",
        select: "fullName nickname",
      });
    res.status(200).json(answers);
  } catch (error) {
    return res.status(500).json({ message: "Server Error." });
  }
};
