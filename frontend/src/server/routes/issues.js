const express = require("express");
const { getDB } = require("../connect.cjs");

const router = express.Router();

// POST /api/issues - Add a new issue
router.post("/", async (req, res) => {
  const db = getDB();
  const issueData = req.body;

  try {
    const result = await db.collection("issues").insertOne(issueData);
    res.status(201).json({ msg: "Issue reported successfully", issueId: result.insertedId });
  } catch (err) {
    console.error("Error reporting issue:", err);
    res.status(500).json({ msg: "Error reporting issue", error: err.message });
  }
});

// GET /api/issues - Get all issues
router.get("/", async (req, res) => {
  const db = getDB();

  try {
    const issues = await db.collection("issues").find({}).toArray();
    res.status(200).json(issues);
  } catch (err) {
    console.error("Error fetching issues:", err);
    res.status(500).json({ msg: "Error fetching issues", error: err.message });
  }
});

module.exports = router;
