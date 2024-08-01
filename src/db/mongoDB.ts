import mongoose from "mongoose";

import config from "../config";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = config.db.mongoURI;

    if (!mongoURI) {
      throw new Error("MongoDB URI is not defined in the configuration.");
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected to: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
