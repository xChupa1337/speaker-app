import express from "express";
import connectToDataBase from "./database/mongodb";
import { PORT, BASE_URL } from "./config/env";
import AuthRouter from "./routes/auth.routers";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware";

const app = express();
const APP_PORT = PORT || 3000;

app.use(express.json());
app.use(`${BASE_URL}/auth`, AuthRouter);

app.use(errorHandlerMiddleware);

app.listen(APP_PORT, async () => {
  console.log(`App listening on http://localhost:${APP_PORT}`);
  await connectToDataBase();
});
