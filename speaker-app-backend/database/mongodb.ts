import mongoose from "mongoose";
import { MONGODB_URI, NODE_ENV } from "../config/env";

if (!MONGODB_URI) throw new Error("MongoDB URI must be define");

const connectToDataBase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log(`Connected to Database on ${NODE_ENV} mode`);
  } catch (e) {
    console.error("Error connecting to db", e);
    process.exit(1);
  }
};

export default connectToDataBase;
