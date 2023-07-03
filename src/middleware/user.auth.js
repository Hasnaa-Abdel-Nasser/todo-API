import Jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()
const userAuth = (req , res , next) => {
    const token = req.header('token');
    Jwt.verify(token , process.env.JWT_SECRET , async function (err,decoded) {
        if(err){
            if (err.name === 'TokenExpiredError') {
                // Token expired
                return res.status(401).json({ message: 'Token expired' });
              }
              // Other JWT verification errors
              return res.status(401).json({ message: 'Invalid token' });
        }else{
            req.id = decoded.id;
            next();
        }
    })
}

export default userAuth;
