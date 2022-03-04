const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running....");
});

const port = process.env.port || 6000;

app.listen(port, console.log(`server started at ${port}`));
