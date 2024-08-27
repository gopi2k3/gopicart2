import e from 'express';
import cookieParser from 'cookie-parser';

const app = e();
app.use(cookieParser());

export const sendToken = (User, statusCode, res) => {
  const token = User.getJwtToken();

  //setting cookies 
  const options = {
    expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false, // Set to false if using HTTP
    sameSite: 'Lax' // or 'Strict', depending on your requirements
};


  res.status(statusCode)
  .cookie('token', token, options)
  .json({
      success: true,
      token,
      User
  })
};
