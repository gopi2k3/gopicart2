import { AsyncError } from "../middleware/catchAsyncError.js";
import { UserModel } from "../Models/userModel.js";
import { ErrorHandler } from "../Utils/errorHandler.js";
import { sendToken } from "../Utils/jwt.js";
import { sendEmail } from "../Utils/mail.js";

import crypto from "crypto";

// register User =========== http://localhost:8080/cart/register

export const registerUser = AsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  let avatar;

  let BASE_URL=process.env.BACKEND_URL

  if(process.env.NODE_ENV==='production'){
    BASE_URL=`${req.protocol}://${req.get('host')}`

  }

  if(req.file){
    avatar =`${BASE_URL}/Uploads/User/${req.file.originalname}`
  }

  const User = await UserModel.create({ name, email, password, avatar });

  sendToken(User, 201, res);
});

// Login== http://localhost:8080/cart/login

export const loginUser = AsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  let User = await UserModel.findOne({ email }).select("+password");

  if (!User) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  if (!(await User.isValidPassword(password))) {
    return next(new ErrorHandler("Invalid Email or Password  ", 401));
  }

  sendToken(User, 201, res);
});

// Logout User== http://localhost:8080/cart/logout  Get

export const logoutUser = (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({ success: true, message: "Logged Out" });
};

// forgot Pass word =====  http://localhost:8080/cart/password/forgot

export const forgotPassword = AsyncError(async (req, res, next) => {
  // Find user by email
  const user = await UserModel.findOne({ email: req.body.email });

  // If user is not found, return an error
  if (!user) {
    return next(new ErrorHandler("User Not Found This Email", 404));
  }

  // Generate reset token using a method from the User model
  const resetToken = user.getResetToken();

  // Save user without validation
  await user.save({ validateBeforeSave: false });

  
  let BASE_URL=process.env.FRONTEND_URL

  if(process.env.NODE_ENV==='production'){
    BASE_URL=`${req.protocol}://${req.get('host')}`

  }

  // Create reset URL
  const resetUrl = `${BASE_URL}/password/reset/${resetToken}`;

  // Create email message
  const message = `Your Password reset url is as follows \n \n ${resetUrl} \n\n If you have not requested this email, then ignore it`;

  try {
    // Send email with the reset URL
    await sendEmail({
      email: user.email,
      subject: "Gopi Cart Pass Recover",
      message,
    });

    // Respond with success message
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (err) {
    console.log(err);

    // Remove reset token and expiry date if email fails
    user.resetPasswordTokenExpire = undefined;
    user.resetPasswordToken = undefined;

    // Save user without validation
    await user.save({ validateBeforeSave: false });

    // Return error message
    return next(new ErrorHandler(err.message), 500);
  }
});

// Password Reset--------------http://localhost:8080/cart/password/reset/6a88b7433f6f19561cbc6a6581805edf2def323e

export const resetPassword = AsyncError(async (req, res, next) => {
  // Hash the token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const User = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire: { $gt: Date.now() },
  });

  if (!User) {
    return next(new ErrorHandler("Password Reset token is Invalid Or Expired"));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password Does Not Match"));
  }

  User.password = req.body.password;

  User.resetPasswordToken = undefined;
  User.resetPasswordTokenExpire = undefined;

  await User.save({ validateBeforeSave: false });

  sendToken(User, 201, res);
});

// Get User Profile    -----http://localhost:8080/cart/myprofile

export const getUserProfile = AsyncError(async (req, res, next) => {
  const User = await UserModel.findById(req.user.id);

  res.status(200).json({ success: true, User });
});

// Change Password ---http://localhost:8080/cart/password/chanage

export const changePassword = AsyncError(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id).select("+password");

  if (!(await user.isValidPassword(req.body.oldPassword))) {
    return next(new ErrorHandler("Old Password is Incorrect", 401));
  }

  user.password = req.body.password;

  await user.save();

  res.status(200).json({ success: true });
});

// Update-Profile-----------http://localhost:8080/cart/update

export const updateProfile = AsyncError(async (req, res, next) => {
  let newUserData = {
    name: req.body.name,
    email: req.body.email,
  };


  let avatar;

  let BASE_URL=process.env.BACKEND_URL

  if(process.env.NODE_ENV==='production'){
    BASE_URL=`${req.protocol}://${req.get('host')}`

  }

  if(req.file){
    avatar =`${BASE_URL}/Uploads/User/${req.file.originalname}`

    newUserData={...newUserData,avatar}
  }

  let User = await UserModel.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, User });
});

// Admin:Get All User-------------/admin/users

export const getAllUser = AsyncError(async (req, res, next) => {
  let Users = await UserModel.find();

  res.status(200).json({ status: true, count: Users.length, Users });
});


//Admin : Get Specific User--   /admin/user/:id

export const getUser = AsyncError(async (req, res, next) => {

  let id=req.params.id
  let User = await UserModel.findById(id)
  if (!User) {
    return next(new ErrorHandler(`User Not found this id ${req.params.id}`));
  }

  res.status(200).json({ status: true, User });
});


// Admin Update User ---/admin/user/:id

export const updateUser = AsyncError(async (req, res, next) => {
  let id=req.params.id;
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  let User = await UserModel.findByIdAndUpdate(id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, User });
});

// Admin : Delete User---/admin/user/:id

export const deleteUser = AsyncError(async (req, res, next) => {
  let id=req.params.id
  let User = await UserModel.findById(id);

  if (!User) {
    return next(new ErrorHandler(`User not found with this ID: ${id}`));
  }

  await UserModel.deleteOne({ _id: id });

  res.status(200).json({ success: true });
});
