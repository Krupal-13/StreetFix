const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./connect.cjs");
const authRoutes = require("./routes/auth");

dotenv.config({ path: "./src/server/config.env" });

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
