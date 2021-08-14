const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");


exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

//   Register user
exports.signup = async (req, res, next) => {
  const { firstname, lastname, email, password, cpassword } = req.body;

  try {
    const oldUser = await User.findOne({ email: req.body.email });
    if (password != cpassword) {
      return res.status(401).json({ sucess: false, error: "Invalid credential" });
    }
    if (oldUser) {
      return res.status(409).json({ sucess: false, error: "user already exist" })
    }
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
    });

    sendToken(user, 200, res);
  }
  catch (err) {
    next(err);
  }
};


const sendToken = async (user, statusCode, res) => {
  const token = await user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token });
};