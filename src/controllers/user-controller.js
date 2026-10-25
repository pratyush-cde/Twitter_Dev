const { UserService } = require("../services/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config/serverConfig");
const User = require("../models/user");

const userService = new UserService();

const signup = async (req, res) => {
  try {
    const user = await userService.signup(req.body);
    const userData = user.toObject();
    delete userData.password;

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      err: {},
      data: userData,
    });
  } catch (error) {
    const duplicateEmail = error.code === 11000;
    return res.status(duplicateEmail ? 409 : 400).json({
      success: false,
      message: duplicateEmail ? "Email is already registered" : error.message,
      err: {},
      data: {},
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordMatches = user && password && await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        err: {},
        data: {},
      });
    }

    const token = jwt.sign({}, JWT_SECRET, {
      subject: user.id,
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      err: {},
      data: { token },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to log in",
      err: { message: error.message },
      data: {},
    });
  }
};

const getCurrentUser = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Current user retrieved",
    err: {},
    data: req.user,
  });
};

module.exports = { signup, login, getCurrentUser };
