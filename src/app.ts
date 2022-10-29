import * as express from "express";
import docsRouter from "./routes/docs/doc.route";
import authRouter from "./routes/auth/auth.route";
import userRouter from "./routes/user/user.route";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Hello world" });
});

app.use("/docs", docsRouter);

app.use("/dashboard/user/auth", authRouter);

app.use("/dashboard/user", userRouter);

export default app;
