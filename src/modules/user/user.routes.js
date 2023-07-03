import { Router } from "express";
import * as method from './user.controller.js';
import * as userValidation from './user.validation.js';
import {validation} from '../../middleware/validation.js';
import userAuth from '../../middleware/user.auth.js';
import {SingleFile} from '../../utils/files.uploads.js';

const userRouter = new Router();

userRouter.post('/signup' ,validation(userValidation.signUp), method.signUp);

userRouter.post('/signin' , validation(userValidation.signIn), method.signIn);
//Route for verify email by code
userRouter.patch('/verify' , validation(userValidation.verify), method.verifyCode);
// Route for resending email verification
userRouter.post('/resend/email' , method.resendEmailVerification);
// Route for forget password of user
userRouter.post('/forgetpassword' , method.forgotPassword);
// Route for reset password
userRouter.patch('/newpassword' , validation(userValidation.newPassword) ,userAuth , method.changePassword);
// Route for upload profile image
userRouter.patch('/image',userAuth,SingleFile('image'),method.uploadProfileImg);
//Route for get profile data
userRouter.get('/profile',userAuth,method.getProfile);

userRouter.delete('/logout' , userAuth, method.logout);

export default userRouter;