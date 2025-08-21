import mongoose from "mongoose";

export interface IAnswer extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  question: mongoose.Schema.Types.ObjectId;
  body: string;
  owner: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const answerSchema = new mongoose.Schema<IAnswer>(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
    body: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Answer = mongoose.model<IAnswer>("Answer", answerSchema);

export default Answer;
