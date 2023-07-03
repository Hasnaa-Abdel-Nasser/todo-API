import taskModel from "../../../database/models/task.model.js";
import userModel from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catch.errors.js";
import { AppError } from "../../utils/response.error.js";

export const addTask = catchError(async (req, res, next) => {
  const user = await userModel.findById(req.id);
  if (!user) return next(new AppError("Not Found user"));
  req.body.userId = req.id;
  const newTask = new taskModel(req.body);
  const saveTask = await newTask.save();
  if (!saveTask) return next(new AppError("Can't Add This Task", 400));
  res.status(200).json({ message: "success", saveTask });
});

export const editTask = catchError(async (req, res, next) => {
    const edit = await taskModel.findByIdAndUpdate(req.body._id , req.body,{new:true});
    if(!edit) return next(new AppError('Some Error' , 400));
    res.status(200).json({message:"success" , edit});
});

export const deleteTask = catchError(async (req, res, next) => {
    const deletetask = await taskModel.findOneAndDelete({_id:req.query.id , userId:req.id})
    if(!deletetask) return next(new AppError('Some Error' , 400));
    res.status(200).json({message:"success" , deletetask});
});

export const getAllTasks = catchError(async (req, res, next) => {
    let userTasks = null;
    if(req.query.list == 'all')  userTasks = await taskModel.find({userId:req.id});
    else userTasks = await taskModel.find({list:req.query.list , userId:req.id});
    res.status(200).json({message:"success" , Tasks:userTasks});
});

export const getTaskByTime = catchError(async (req, res, next) => {
    let time = req.query.time;
    let tasks;
    let userId = req.id;
    if (time === 'day') {
        // Get all tasks matching the current day
        const startOfDay = new Date(req.body.date);
        const endOfDay = new Date(req.body.date);
        endOfDay.setUTCHours(23,59,59,0);
        endOfDay.toISOString()
        console.log(startOfDay); console.log(endOfDay)
        tasks = await taskModel.find({ userId , timedate: { $gte: startOfDay, $lt: endOfDay } });

    } else if (time === 'week') {
        // Get all tasks within the next 7 days
        const currentDate =  new Date(req.body.date);
        const currentWeek = new Date(req.body.date);
        const nextWeekDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
        tasks = await taskModel.find({userId ,  timedate: { $gte: currentWeek, $lt: nextWeekDate } });

    } else if (time === 'month') {
        // Get all tasks within the current month
        const startOfMonth = new Date(req.body.date);
        let endOfMonth = new Date(req.body.date);
        endOfMonth = new Date(endOfMonth.getFullYear(), endOfMonth.getMonth() + 1, 0);
        console.log(endOfMonth);
        tasks = await taskModel.find({userId ,  timedate: { $gte: startOfMonth, $lte: endOfMonth } });

    }else if (time === 'tomorrow') {
      
        const currentDate = new Date();
        currentDate.setUTCHours(0,0,0,0);
        currentDate.toISOString()
        console.log(currentDate);
        const tomorrowDate = new Date(currentDate);
        tomorrowDate.setDate(currentDate.getDate() + 1); // Set tomorrow's date
        const nextDayDate = new Date(tomorrowDate);
        nextDayDate.setDate(nextDayDate.getDate()); // Set tomorrow's date
        nextDayDate.setUTCHours(23,59,59,0);
        tasks = await taskModel.find({
          userId , 
          timedate: {
            $gte: tomorrowDate,
            $lte: nextDayDate
          }
        });
      }
      
          
    res.status(200).json({message:"success" , tasks});
})

