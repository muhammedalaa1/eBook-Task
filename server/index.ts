/// <reference path="./index.d.ts" />

import dotenv from "dotenv";
import express, { type Application } from "express";
import cors from "cors";
import errorhandler from "./middleware/errorhandler";
import booksRouter from "./routes/books";
import { auth } from "./middleware/authentication";
import Auth from "./routes/auth";
import http from "http";
dotenv.config();
import connectDB from "./config/dbConn";

const app: Application = express();

const server = http.createServer(app);
const PORT: string | number = process.env.PORT || 3500;
app.disable("x-powered-by");

// Connect to DB
connectDB();
// Cross Origin Resource Sharing
const allowedOrigins = [
  "http://localhost:5173",
  "https://e-book-task.vercel.app/",
  "https://ebook-task.onrender.com/",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const errMsg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(errMsg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(auth);
app.use("/api/auth", Auth);

app.use("/api/books", booksRouter);

app.get("/", (_, res) => res.json(_.user));
app.use(errorhandler);
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
