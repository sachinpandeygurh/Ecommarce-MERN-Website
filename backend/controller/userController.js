const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../model/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a simple id",
      url: "profilepicurl",
    },
  });

  const token = user.getJWTToken();

  // send back the token to client side
  sendToken(user, 201, res);
});
// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if the user has given both email and password
  if (!email || !password) {
    return next(new ErrorHandler("Please provide an email and password!", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

//lOGOUT USER
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res
    .status(200)
    .json({ success: true, status: "success", Message: "Logged out" });
});

// Forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("No account with this email exists", 400));
  }

  // get ResetPassword Token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
  const message = `Follow this link to reset your Password : \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it. \n\n <h2> Thanks for using our services </h2> \n\n <h5> for more information please visit: ${
    req.protocol
  }://${req.get("host")} </h5> `;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully click link to recover your password has been sent to you!`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating tokenhash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // Find the user by the reset password token and check if the token has expired.
  const user = await User.findOne({
    resetPasswordToken: await User(req.body.resetPasswordToken).resetPasswordToken,
    // resetPasswordExpire: { $gt: Date.now() + 10 * 60 * 60 * 1000 },
  });
  const user2 = await User.findOne({ resetPasswordToken: req.body.resetPasswordToken });
  console.log('URL Token:', req.params.token);
  console.log('Generated Token:', resetPasswordToken);
  console.log('User:', user);
  // console.log('User:', user2);

  if (!user) {
    return next(new ErrorHandler(`Invalid or expired link`, 400));
  }

  // Check if the passwords match.
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler(`Passwords do not match`, 400));
  }

  // Update the user's password.
  user.password = req.body.password;

  // Reset the reset password token and expiration date.
  user.resetPasswordToken = undefined;
  resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  // Save the user.
  await user.save();

  // Send the user a token.
  sendToken(user, 200, res);
});
