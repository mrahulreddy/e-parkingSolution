const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const app = express();
dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("API is running....");
});

const port = process.env.port || 6000;

app.listen(port, console.log(`server started at ${port}`));
