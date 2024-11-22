import mongoose, { Schema, model } from "mongoose";
const userSchema = new Schema(
    {
    email:{
        type:String,
        unique:true,
        required:true,
    },
    userName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    },
    profilePic:{
        type:[String]
    },
    coverPic:{
        type:String
    },
    public_id:String,
},{timestamps:true});
const userModel = mongoose.models.User || model('User',userSchema);
export default userModel;
