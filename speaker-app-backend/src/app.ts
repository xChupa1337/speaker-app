import express, { Request, Response } from "express";
import connectToDataBase from "./database/mongodb";
import { PORT, BASE_URL } from "./config/env";
import AuthRouter from "./routes/auth.routers";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware";

const app = express();
const APP_PORT = PORT || 3000;

app.use(express.json());

// Глобальний логер запитів
app.use((req, res, next) => {
  console.log(`\n📡 [${req.method}] ${req.url}`);
  console.log(`Body:`, req.body);
  next();
});

// Health check endpoint — використовується CI/CD pipeline і моніторингом
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "speaker-app-backend",
    version: process.env.npm_package_version || "1.0.0",
  });
});

app.use(`${BASE_URL}/auth`, AuthRouter);

app.use(errorHandlerMiddleware);

// Підключення до БД і запуск сервера лише коли файл виконується напряму
// При імпорті тестами — цей блок не виконується
const server = app.listen(APP_PORT, async () => {
  console.log(`App listening on http://localhost:${APP_PORT}`);
  if (process.env.NODE_ENV !== "test") {
    await connectToDataBase();
  }
});

export { app, server };

