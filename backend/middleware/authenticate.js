import { UserModel } from "../Models/userModel.js";
import { ErrorHandler } from "../Utils/errorHandler.js";
import { AsyncError } from "./catchAsyncError.js";

import jwt from "jsonwebtoken";

// Middleware to authenticate the user
export const isAuthenticateUser = AsyncError(async (req, res, next) => {
  const { token } = await req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to handle this resource", 401));
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await UserModel.findById(decode.id);

  next();
});

// Middleware to authorize roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`, 403));
    }
    next();
  };
};




