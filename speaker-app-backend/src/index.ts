import express from "express";
import { PORT } from "../config/env";
import connectToDataBase from "../database/mongodb";

const app = express();
const APP_PORT = PORT || 3000;

app.listen(APP_PORT, async () => {
  console.log(`App listening on http://localhost:${APP_PORT}`);
  await connectToDataBase();
});
