import mongoose from "mongoose";

export const connect = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.log("env error: can't find process.env.MONGO_URI");
    process.exit(1);
  }

  try {
    const { connection } = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${connection.host}`);
  } catch (error) {
    console.log("Error in connection to MongoDB");
    process.exit(1);
  }
};
