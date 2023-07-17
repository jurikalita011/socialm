const UserModel = require("../models/userModel");
require("dotenv").config();
const express = require("express");
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

UserRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    bcrypt.hash(password, 6, async (err, hash) => {
      if (err) {
        res.status(401).send({
          msg: "unable to sign up, please try again",
          err: err.message,
        });
      } else {
        const user = await UserModel.create({ ...req.body, password: hash });
        res.status(200).send({ msg: "New user has been added", user });
      }
    });
  } catch (error) {
    res.status(500).send({
      msg: "unable to sign up, Sign up failed!",
      err: err.message,
    });
  }
});
/*
{
    "name":"abc",
"email":"abc@gmail.com",
"gender":"male",
"password":"abc123"
}
*/

//login
UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    // console.log(user);
    if (user) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          res.status(401).send({ msg: "wrong credentials", err: err.message });
        } else {
          let token = jwt.sign(
            { userId: user[0]._id, userName: user[0].name },
            process.env.SECRETKEY
          );
          res.status(200).send({ msg: "successfully logged in", token: token });
        }
      });
    }
  } catch (error) {
    res.status(500).send({
      msg: "unable to sign in, Sign In failed!",
      error: error.message,
    });
  }
});

module.exports = UserRouter;
