const express = require("express");
require("dotenv").config();
const connection = require("./db");
const userRouter = require("./routes/UserRouter");
const postRouter = require("./routes/PostRouter");

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
  console.log("running at port 8080");
});
