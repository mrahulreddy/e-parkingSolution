const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const users_data = require("./data/users");
const User = require("./models/userModel");

console.log({ User });
const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.get("/mydata", (req, res) => {
  res.send("API is with data");
});

app.get("/api/userdata", (req, res) => {
  res.send(users_data);
});

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.port || 5000;

app.listen(port, console.log(`server started at ${port}`));
