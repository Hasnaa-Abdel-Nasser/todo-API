import { Router } from "express";
import * as method from './task.controller.js';
import {validation} from '../../middleware/validation.js';
import userAuth from '../../middleware/user.auth.js';
import Joi from "joi";

const addSticky = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  note: Joi.string().max(200)
});
const editSticky = Joi.object({
    title: Joi.string().min(3).max(30),
    note: Joi.string().max(200)
});
const taskRouter = new Router();

taskRouter.post('/new' , userAuth ,validation(addSticky), method.addTask);

taskRouter.patch('/edit' , userAuth ,validation(editSticky),  method.editTask);

taskRouter.get('/get' , userAuth, method.getAllTasks);

taskRouter.delete('/delete' ,userAuth , method.deleteTask);

export default taskRouter;