const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const generateToken = require("../util/generateToken");

const getUsers = asyncHandler(async (req, res) => {
  const alluserdata = await User.find();
  res.json(alluserdata);
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isOwner: user.isOwner,
      token: generateToken(user._id),
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Error occured...");
  }
});

const addAdmin = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    user.isAdmin = true;
    const updatedUser = await user.save();
    res.json(updatedUser);
  }
});

const addOwner = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    user.isOwner = true;
    const updatedUser = await user.save();
    res.json(updatedUser);
  }
});

const removeAdmin = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    user.isAdmin = false;
    const updatedUser = await user.save();
    res.json(updatedUser);
  }
});

const removeOwner = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    user.isOwner = false;
    const updatedUser = await user.save();
    res.json(updatedUser);
  }
});

const validateUser = asyncHandler(async (req, res) => {
  const { token } = req.body;

  // var id = new mongoose.Types.ObjectId(token);
  const user = await User.findOne({ _id: token });

  if (user) {
    user.isValidated = true;
    const updatedUser = await user.save();
    res.json("SucessFully Sign up");
  } else {
    res.status(400);
    throw new Error("Not a Valid link");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (
    user &&
    (await user.matchPassword(password)) &&
    user.isValidated == true
  ) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isOwner: user.isOwner,
      token: generateToken(user._id),
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Password or UserName is incorrect");
  }
});

module.exports = {
  registerUser,
  authUser,
  getUsers,
  addAdmin,
  addOwner,
  validateUser,
  removeAdmin,
  removeOwner,
};
