import type {
  Answer,
  AnswerPayload,
  LoginPayload,
  Question,
  QuestionPayload,
  SignupPayload,
  User,
} from "../types";
import axiosInstance from "./axios";

export const getAuthUser = async (): Promise<User | null> => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (error) {
    return null;
  }
};

export const login = async (data: LoginPayload): Promise<{ uid: string }> => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const signup = async (data: SignupPayload): Promise<{ uid: string }> => {
  const response = await axiosInstance.post("/auth/signup", data);
  return response.data;
};

export const getQuestions = async (): Promise<Question[]> => {
  const response = await axiosInstance.get("/question/questions");
  return response.data;
};

export const getQuestion = async (question: string): Promise<Question> => {
  const response = await axiosInstance.get(`/question/question/${question}`);
  return response.data;
};

export const getAnswers = async (question: string): Promise<Answer[]> => {
  const response = await axiosInstance.get(
    `/answer/getQuestionAnswers/${question}`
  );
  return response.data;
};

export const postQuestion = async (
  data: QuestionPayload
): Promise<Question> => {
  const response = await axiosInstance.post(`/question/question`, data);
  return response.data;
};

export const postAnswer = async (data: AnswerPayload): Promise<Answer> => {
  const response = await axiosInstance.post(`/answer/${data.qid}/answer`, {
    body: data.body,
  });
  return response.data;
};
