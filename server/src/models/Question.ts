import mongoose from "mongoose";

export interface IQuestion extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  body: string;
  tags: string[];
  owner: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new mongoose.Schema<IQuestion>(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
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

const Question = mongoose.model<IQuestion>("Question", questionSchema);

export default Question;
