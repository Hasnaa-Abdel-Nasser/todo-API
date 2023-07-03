import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type:String,
        trim:true
    },
    email: {
        type:String,
        unique:true
    },
    password: String,
    profileImage: String,
    code: String,
    verified:{
        type: Boolean,
        default: false
    },
    lists:{
        type: [String],
        default: ['personal' , 'work'],
        lowercase: true
    }
},{timestamps: true});

const userModel = mongoose.model('user' , userSchema);
export default userModel;
