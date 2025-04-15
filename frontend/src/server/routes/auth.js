const express = require("express");
const bcrypt = require("bcrypt");
const { getDB } = require("../connect.cjs");

const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log("Signup request received:", req.body);
  const { name, email, password } = req.body;
  const db = getDB();

  try {
    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      console.log("User already exists:", email);
      return res.status(400).json({ msg: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    await db.collection("users").insertOne({ name, email, password: hash });

    console.log("User registered successfully:", email);
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ msg: "Signup error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const db = getDB();

  try {
    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    res.status(200).json({ msg: "Login successful", name: user.name });
  } catch (err) {
    res.status(500).json({ msg: "Login error", error: err.message });
  }
});

module.exports = router;