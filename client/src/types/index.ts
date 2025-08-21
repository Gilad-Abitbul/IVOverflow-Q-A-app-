export type User = {
  _id: string;
  fullName: string;
  nickname: string;
  email: string;
  createdAt: string; // ISO date string
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  email: string;
  password: string;
  fullName: string;
  nickname: string;
};

export type Question = {
  _id: string;
  title: string;
  body: string;
  tags: string[];
  owner:
    | {
        _id: string;
        nickname: string;
        fullName: string;
      }
    | string;
  createdAt: string;
  updatedAt: string;
};

export type QuestionPayload = {
  title: string;
  body: string;
  tags: string[];
};

export type Answer = {
  _id: string;
  question: string;
  body: string;
  owner:
    | {
        _id: string;
        fullName: string;
        nickname: string;
      }
    | string;
  createdAt: string;
  updatedAt: string;
};

export type AnswerPayload = {
  body: string;
  qid: string;
};
