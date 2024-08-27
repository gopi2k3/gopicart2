import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import crypto from 'crypto'

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter a Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter a Email "],
    unique: true,
    validate: [validator.isEmail, "Please Enter a Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter a Password"],
    maxlength: [6, "Password Cannot exceed 6 Character"],
    select:false
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save',async function (next){
  if(!this.isModified('password')){

    next()

  }
  this.password= await bcrypt.hash(this.password,10)
})

userSchema.methods.getJwtToken = function() {
  return jwt.sign(
    { id: this.id }, // Payload: the user's ID is stored in the token
    process.env.JWT_SECRET, // Secret key used to sign the token
    { expiresIn: process.env.JWT_EXPIRES_TIME } // Token expiration time
  );
};


userSchema.methods.isValidPassword= async function(enteredpassword){
  return  await bcrypt.compare(enteredpassword,this.password)
}


userSchema.methods.getResetToken=function(){
  // Generate token
 const token= crypto.randomBytes(20).toString('hex')
 //Generate Hash and set to resetPasswordToken
 this.resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex')
//setresetPassword expire Time
 this.resetPasswordTokenExpire=Date.now() +30* 60*1000;
 return token
}



export let UserModel = mongoose.model("userData", userSchema);
