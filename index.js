const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const path = require("path");
const connectDatabase = require("./config/database");
const errorHandler = require("./middlewares/errorHandler");

// Basic Configuration
const { PORT } = require("./config/index");
app.use(cors());
// Connect Database
connectDatabase();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
// API routes

const users = require("./routes/users.route");
app.use("/api/users", users);

// Not found
app.use(function (req, res, next) {
  res.status(404);
  // respond with html page
  if (req.accepts("html")) {
    res.sendFile(path.resolve("views/404.html"));
    return;
  }
  // respond with json
  if (req.accepts("json")) {
    res.json({ error: "Not found" });
    return;
  }
  // default to plain-text. send()
  res.type("txt").send("Not found");
});

app.use(errorHandler);
//
app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
