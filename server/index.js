//framwork for building web apps that creates server
import express from "express";
import AuthRoute from "./routes/auth.js";
import TodoRoute from "./routes/todo.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Creates intance of an Express Applcation
// app is your main application object that you can set up routes
// AKA your server
const app = express();
// PORT which the server will listen for incoming HTTP reqs
const PORT = 3000;

dotenv.config();

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(cookieParser());

// defining routes that calls route handler
// Client sends request to server where checks with handler should process it
app.use("/api/user", AuthRoute);
app.use("/api/todos", TodoRoute);

// route for HTTP GET reqs to root URL
//http://localhost:3000/ (when user navigates to this "/", then send res of string)
app.get("/", (req, res, next) => {
  res.send("hello world");
});

//global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ error: message });
});

// Starts the server and listens for HTTP reqs
// callback function logs the the server that is listening
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
