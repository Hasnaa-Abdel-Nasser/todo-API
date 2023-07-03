import { Router } from "express";
import * as method from './task.controller.js';
import * as taskValidation from './task.validation.js';
import {validation} from '../../middleware/validation.js';
import userAuth from '../../middleware/user.auth.js';

const taskRouter = new Router();

taskRouter.post('/new' , userAuth ,validation(taskValidation.addTask), method.addTask);

taskRouter.patch('/edit' , userAuth ,validation(taskValidation.editTask),  method.editTask);

taskRouter.get('/get' , userAuth, method.getAllTasks);

taskRouter.get('/gettasks',userAuth,method.getTaskByTime);

taskRouter.delete('/delete' ,userAuth , method.deleteTask);

export default taskRouter;