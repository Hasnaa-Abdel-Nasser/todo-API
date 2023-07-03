import userModel from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catch.errors.js";
import { AppError } from "../../utils/response.error.js";
import bcrypt from "bcrypt";
import sendEmail from "../../utils/email.validation.js";
import Jwt from "jsonwebtoken";
import * as manage from './user.manage.js';
import cloudinary from "../../utils/cloudinary.js";

export const signUp = catchError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) return next(new AppError("Email already exists", 409));
  const salt = await bcrypt.genSalt(+process.env.SALTROUNDS); //salt value to be dynamically generated for each user.(More Security)
  const hashedPassword = await bcrypt.hash(password, salt);
  let code = manage.createCode();
  const newUser = new userModel({name,email,password: hashedPassword,code,});
  const saveUser = await newUser.save();
  await sendEmail({ email, name, code });
  saveUser
    ? res.status(200).json({ message: "success" })
    : next(new AppError("some problem", 400));
});

export const signIn = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      user.code = manage.createCode();
      await user.save();
      await sendEmail({ email, name: user.name, code:user.code });
      return res.status(200).json({ message: "success" });
    }
  }
  next(new AppError("Incorrect email or password", 400));
});

export const verifyCode = catchError(async (req, res, next) => {
  const { email, code } = req.body;
  const user = await userModel.findOne({ email, code });
  if (!user || user.code !== code) return next(new AppError("Invalid Code", 400));
  const isCodeValid = manage.validateVerificationCode(user.updatedAt);
  if (!isCodeValid){
    user.code = manage.createCode();
    await user.save();
    return next(new AppError("Invalid Code", 400));
  }
  user.verified = true;
  const verify = await user.save();
  if (!verify) return next(new AppError("Some Problem", 400));
  let token = Jwt.sign({ email: email, id: user._id }, process.env.JWT_SECRET,{ expiresIn: '90d' });
  res.status(200).json({ message: "success" , token});
});

export const resendEmailVerification = catchError(async(req,res,next)=>{
    const {email} = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return next(new AppError("Email not found", 400));
    user.code = manage.createCode();
    await user.save();
    await sendEmail({ email, name: user.name, code:user.code });
    res.status(200).json({message:"success"});
})

export const forgotPassword = catchError(async(req,res,next)=>{
    const {email} = req.body;
    const user = await userModel.findOne({ email });
    if(!user) return next(new AppError("Not Found Email", 400));
    user.code = manage.createCode();
    await user.save();
    await sendEmail({ email, name: user.name, code:user.code });
    res.status(200).json({message:"success"});
});

export const changePassword = catchError(async(req,res,next)=>{
    const user = await userModel.findById(req.id);
    if(!user) return next(new AppError("Unable to change password",400));
    const salt = await bcrypt.genSalt(+process.env.SALTROUNDS);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({message:"success"});    
})

export const uploadProfileImg = catchError(async(req , res, next)=>{
    if (!req.file) return next(new AppError("Please upload an image", 400));
    const user = await userModel.findById(req.id);
    if(!user) return next(new AppError("Not Found user", 400));
    const result = await cloudinary.uploader.upload(req.file.path,{ folder: "user" });
    user.profileImage = result.url;
    await user.save();
    res.status(200).json({message:"success"});
})

export const getProfile = catchError(async(req , res, next)=>{
    const user = await userModel.findById(req.id).select('name email profileImage lists');;
    if(!user) return next(new AppError("Not Found user", 404));
    res.status(200).json({message:"success" , user});
})

export const logout = catchError(async(req , res , next)=>{
    const user = await userModel.findByIdAndUpdate({_id:req.id} , {verified:false});
    if(!user) return next(new AppError('Not Found user' , 400));
    res.status(200).json({message:"success"});
})