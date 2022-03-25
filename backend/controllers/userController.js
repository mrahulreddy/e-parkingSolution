const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  // const userExists = await User.findOne({ email });

  // if (userExists) {
  //   res.status(404);
  //   throw new Error("User already exists");
  // }

  // const user = await User.create({
  //   name,
  //   email,
  //   password,
  //   pic,
  // });

  res.json({
    name,
    email,
  });
});

module.exports = { registerUser };
