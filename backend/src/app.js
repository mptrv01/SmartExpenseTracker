const express = require("express");
const cors = require("cors");

const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("../routes/transactionRoutes");

const app = express();

const allowedOrigin =
  process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10kb" }));

app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Smart Expense Tracker API is running",
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "API route not found",
  });
});

module.exports = app;