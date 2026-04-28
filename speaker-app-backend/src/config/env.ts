import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  NODE_ENV,
  MONGODB_URI,
  BASE_URL,
  JWT_SECRET,
  EMAIL_PASSWORD,
  EMAIL_ADDRESS_SENDER,
} = process.env;
