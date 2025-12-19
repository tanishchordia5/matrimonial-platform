const bcrypt = require("bcryptjs"); // Password Hashing
const jwt = require("jsonwebtoken");
const User = require("../users/user.model");

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const registerUser = async (data) => {
  const existingUser = await User.findOne({
    $or: [{ email: data.email }, { phone: data.phone }]
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    email: data.email,
    phone: data.phone,
    passwordHash
  });

  return {
    token: generateToken(user),
    userId: user._id
  };
};

const loginUser = async (data) => {
  const user = await User.findOne({ email: data.email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(data.password, user.passwordHash);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return {
    token: generateToken(user),
    userId: user._id
  };
};

module.exports = { registerUser, loginUser };
