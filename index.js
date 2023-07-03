import express from 'express';
import connect from './database/dbConnection.js';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './src/modules/user/user.routes.js';
import taskRouter from './src/modules/task/task.routes.js';
import { AppError } from './src/utils/response.error.js';
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use(morgan('dev')) // request logger middelware 
app.use('/api/v1/user' , userRouter);
app.use('/api/v1/task' , taskRouter);
app.all('*',(req , res , next)=>{
    next(new AppError('Not Found' , 404));
});
//Global error
app.use((err , req , res , next)=>{
    res.status(err.statusCode).json({message: err.message});
})
app.listen(port , ()=>{
    console.log('listening on port ' + port);
});
