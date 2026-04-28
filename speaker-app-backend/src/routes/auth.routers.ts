import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";

const authRouter = Router();

// PATH: api/v1/auth/sign-in [POST]
authRouter.post("/sign-in", signIn);

// PATH: api/v1/auth/sign-up [POST]
authRouter.post("/sign-up", signUp);

export default authRouter;
