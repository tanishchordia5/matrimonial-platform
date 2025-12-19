const express = require("express");
const cors = require("cors");

const authRoutes = require("./modules/auth/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

const profileRoutes = require("./modules/profiles/profile.routes");

app.use("/api/profile", profileRoutes);

const errorHandler = require("./middlewares/error.middleware");

app.use(errorHandler);

module.exports = app;
