const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./connect.cjs");
const authRoutes = require("./routes/auth");
const issuesRoutes = require("./routes/issues");

dotenv.config({ path: "./src/server/config.env" });

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/issues", issuesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
