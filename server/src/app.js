// You can use import statement 
// after writing "type": "module" in package.json file
import express from "express";
import logger from "morgan";
import cors from "cors";

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import postsRouter from "./routes/posts.js";
import uploadRouter from "./routes/upload.js";

const app = express(); // run express

// Whenever a URL request comes in from the browser, 
// a req or res log is displayed in the terminal 
// with method, URL or STATUS CODE
app.use(logger("dev")); 
app.use(express.json()); // to always receive the request value properly when receiving a request body in json
app.use(cors(["http://localhost:3000"])); 
// Allow http://localhost:3000 which is the domain of the front
// then CORS error not to occur when the domains of the front and backend are different

app.use("/", indexRouter);       // Starting with “/” will be handled by indexRouter.
app.use("/users", usersRouter);  // Starting with “/users” will be handled by usersRouter.
app.use("/posts", postsRouter);  // Starting with “/posts” will be handled by postsRouter.
app.use("/upload", uploadRouter);// Starting with “/upload” will be handled by uploadRouter.

export default app;
