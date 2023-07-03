import stickyModel from "../../../database/models/sticky.model.js";
import userModel from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catch.errors.js";
import { AppError } from "../../utils/response.error.js";

export const addSticky = catchError(async (req, res, next) => {
  const user = await userModel.findById(req.id);
  if (!user) return next(new AppError("Not Found user"));
  req.body.userId = req.id;
  const newNote = new stickyModel(req.body);
  const saveSticky = await newNote.save();
  if (!saveSticky) return next(new AppError("Can't Add This Sticky Wall", 400));
  res.status(200).json({ message: "success", saveSticky });
});

export const editSticky = catchError(async (req, res, next) => {
    const edit = await stickyModel.findOneAndUpdate({_id:req.body._id , userId:req.id} , req.body,{new:true});
    if(!edit) return next(new AppError('Some Error' , 400));
    res.status(200).json({message:"success" , edit});
});

export const deleteSticky = catchError(async (req, res, next) => {
    const deleteNote = await stickyModel.findOneAndDelete({_id:req.query.id , userId:req.id})
    if(!deletetask) return next(new AppError('Some Error' , 400));
    res.status(200).json({message:"success" , deleteNote});
});

export const getAllSticky = catchError(async(req,res,next)=>{
    const sticky = await stickyModel.find({userId:req.id});
    res.status(200).json({message:"success" , sticky})
});
