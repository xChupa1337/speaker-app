import mongoose from "mongoose";
import { MONGODB_URI, NODE_ENV } from "../config/env";

const connectToDataBase = async () => {
  // У тестовому середовищі — підключення керується тестами через MongoMemoryServer
  if (!MONGODB_URI) {
    if (NODE_ENV === "test") return;
    throw new Error("MongoDB URI must be defined");
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to Database on ${NODE_ENV} mode`);
  } catch (e) {
    console.error("Error connecting to db", e);
    process.exit(1);
  }
};

export default connectToDataBase;

