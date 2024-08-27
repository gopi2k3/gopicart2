import { ErrorHandler } from "../Utils/errorHandler.js";

export const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } else if (process.env.NODE_ENV === "production") {
    let message = err.message;
    let error = new ErrorHandler(message, 400);
    // error.message = err.message;

    // Handling Mongoose validation error
    if (err.name === "ValidationError") {
      message = Object.values(err.errors)
        .map((value) => value.message)
        .join(", ");
      error = new ErrorHandler(message, 400);
    }

    // Handling Mongoosle Carse Error
     if (err.name === "CastError") {
      let message = `Resourse Not Found : ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

     if(err.code==11000){
      let message=`Duplicate ${Object.keys(err.keyValue)} Error`
      error = new ErrorHandler(message, 400);
    }

    if(err.name=='JSONWebTokenError'){
      let message='Invalid Token'
      error = new ErrorHandler(message, 400);

    }
    if(err.name=='TokenExpiredError'){
      let message='Token Expired Error'
      error = new ErrorHandler(message, 400);

    }
    if(err.name=='JSONWebTokenError'){
      let message='Invalid Token'
      error = new ErrorHandler(message, 400);

    }
    // Handling other specific errors can be added here

    res.status(err.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
