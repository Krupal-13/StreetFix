const express = require("express");
const { getDB } = require("../connect.cjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });
router.post("/", upload.single('image'), async (req, res) => {
  const db = getDB();
  const issueData = req.body;

  if (req.file) {
    issueData.imageUrl = `/uploads/${req.file.filename}`;
  }
  if (req.body.userId) {
    issueData.userId = req.body.userId;
  }
  if (req.body.userEmail) {
    issueData.userEmail = req.body.userEmail;
  }

  try {
    const result = await db.collection("issues").insertOne(issueData);
    res.status(201).json({ msg: "Issue reported successfully", issueId: result.insertedId });
  } catch (err) {
    console.error("Error reporting issue:", err);
    res.status(500).json({ msg: "Error reporting issue", error: err.message });
  }
});
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
router.get("/user/:userId", async (req, res) => {
  const db = getDB();
  const { userId } = req.params;

  try {
    const issues = await db.collection("issues").find({ userId }).toArray();
    res.status(200).json(issues);
  } catch (err) {
    console.error("Error fetching user issues:", err);
    res.status(500).json({ msg: "Error fetching user issues", error: err.message });
  }
});
router.put("/:id", async (req, res) => {
  const db = getDB();
  const { id } = req.params;
  const updateData = req.body;

  console.log("Update request received for id:", id, "with data:", updateData);

  try {
    const { ObjectId } = require('mongodb');
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid issue ID" });
    }
    const result = await db.collection("issues").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ msg: "Issue not found" });
    }
    res.status(200).json({ msg: "Issue updated successfully" });
  } catch (err) {
    console.error("Error updating issue:", err);
    res.status(500).json({ msg: "Error updating issue", error: err.message, stack: err.stack });
  }
});
router.delete("/:id", async (req, res) => {
  const db = getDB();
  const { id } = req.params;

  console.log("Delete request received for id:", id);

  try {
    const { ObjectId } = require('mongodb');
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid issue ID" });
    }
    const result = await db.collection("issues").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "Issue not found" });
    }
    res.status(200).json({ msg: "Issue deleted successfully" });
  } catch (err) {
    console.error("Error deleting issue:", err);
    res.status(500).json({ msg: "Error deleting issue", error: err.message });
  }
});

module.exports = router;
