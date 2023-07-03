import nodemailer from 'nodemailer';
import {html} from './email.html.js'
import { nanoid } from "nanoid";
import * as dotenv from 'dotenv'
dotenv.config();

const sendEmail =async(data)=>{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASSWORD
        }
    });
    let info = await transporter.sendMail({
        from: `"TODO" <${process.env.EMAIL}>`,
        to: data.email,
        subject: "Confirm Email",
        html:html({code:data.code,name:data.name})
    });
}
export default sendEmail