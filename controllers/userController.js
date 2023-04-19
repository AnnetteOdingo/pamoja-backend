const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add new fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const randNum =  Math.floor(Math.random() * 20) + 1;
  const avatarUrl = `https://avatars.test.readeo.com/default-profile-${randNum}.png`
  const user = await User.create({ name, email, password: hashedPassword, avatarUrl: avatarUrl });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      credits: user.credits,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
const updateUserInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedUser);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    let returnMsg = {
      _id: user.id,
      name: user.name,
      email: user.email,
      credits: user.credits,
      token: generateToken(user.id),
    };
    res.status(201).json(returnMsg);
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
const getUserDetails =asyncHandler(async(req, res)=>{
  const user = await User.findById(req.user.id);
  res.status(200).json(user)
})

module.exports = { registerUser, updateUserInfo, loginUser, getUserDetails };
