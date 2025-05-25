const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = require("../models/user");

const router= express.Router();

 const Signup= router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existinguser = await user.findOne({ username });
    if (existinguser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const newUser = new user({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("Error signing up ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});
  const Login = router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await user.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Wrong password or username" });
    }
    const token = jwt.sign({ userId: user_id }, "SECRET_KEY", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.log("Error logging in ", error.message);
    res.status(500).json({ message: "Internal server errror" });
  }
});
module.exports = router,
Login,
Signup;
