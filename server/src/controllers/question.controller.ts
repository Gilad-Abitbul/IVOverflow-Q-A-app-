import { NextFunction, Request, Response } from "express";
import Question from "../models/Question";

export const getQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 }).populate({
      path: "owner",
      select: "nickname",
    });
    res.status(200).json(questions);
  } catch (error) {
    return res.status(500).json({ message: "Server Error." });
  }
};

export const getQuestionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id).populate({
      path: "owner",
      select: "fullName nickname",
    });

    if (!question)
      return res.status(404).json({ message: "Question Not Found." });

    res.status(200).json(question);
  } catch (error) {
    return res.status(500).json({ message: "Server Error." });
  }
};

export const createQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, body, tags } = req.body;

    const owner = req.uid;
    const question = await Question.create({
      title,
      body,
      owner,
      tags,
    });
    res.status(201).json(question);
  } catch (error) {
    return res.status(500).json({ message: "Server Error." });
  }
};
