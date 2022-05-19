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

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.port || 5000;

app.listen(port, console.log(`server started at ${port}`));
