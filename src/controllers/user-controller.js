const { UserService } = require("../services/index");

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

module.exports = { signup };
