import express from "express";
import logger from "morgan";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import postsRouter from "./routes/posts.js";
import uploadRouter from "./routes/upload.js";

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(logger("combined"));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(logger("dev"));
}
app.use(express.json());
app.use(cors(["http://localhost:3000", "art-gallery-app"]));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/upload", uploadRouter);

export default app;
