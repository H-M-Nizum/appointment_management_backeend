import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

// Parser
app.use(express.json());
app.use(cors());

// Application Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
