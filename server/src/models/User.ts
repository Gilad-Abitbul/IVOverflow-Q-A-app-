import mongoose from "mongoose";
import { compare, hash } from "../utils/crypto";

export interface IUser extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  nickname: string;
  fullName: string;
  email: string;
  password: string;
  comparePassword(enteredPassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    nickname: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre(
  "save",
  function (next: mongoose.CallbackWithoutResultAndOptionalError): void {
    try {
      if (!this.isModified("password")) return next();
      this.password = hash(this.password);
      next();
    } catch (error) {
      next(error as mongoose.CallbackError);
    }
  }
);

userSchema.methods.comparePassword = function (
  enteredPassword: string
): boolean {
  return compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
