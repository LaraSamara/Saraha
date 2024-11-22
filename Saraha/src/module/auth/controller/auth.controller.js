import userModel from "../../../../DB/model/user.model.js";
import { compare, hash } from "../../../services/hashAndCompare.js";
import { generateToken, verifyToken } from "../../../services/generateAndVerifyToken.js";
import { sendEmail } from "../../../services/sendEmail.js";
export const signup = async(req,res,next)=>{
    const {userName,email,password,confirmPassword} = req.body;
    const user = await userModel.findOne({email});
    if(user){
        return next(new Error("email is already exist"));
    }
    const hashPassword = hash(password);
    const token =generateToken({email},process.env.EMAIL_TOKEN);
    const link =`http://localhost:3000/auth/confirmEmail/${token}`;
    sendEmail(email,'Confirm Your Email',`<a href = "${link}">please confirm your email</a>`)
    const createUser = userModel.create({userName,email,password:hashPassword});
    return res.json({message:"success"});
}

export const signin = async(req,res,next)=>{
    const {email,password} = req.body;
    const user =await  userModel.findOne({email});
    if(!user){
        return next(new Error("user not found"));
    }
    if(!user.confirmEmail){
        return next(new Error("please confirm your email"));
    }
    const match = compare(password,user.password);
    if(!match){
        return next(new Error("invalid data"));
    }else{
        const token = generateToken({id:user._id,loggidIn:true});
        return res.status(200).json({message:"success", token});
    }

}
export const confirmEmail =async(req,res,next)=>{
    const {token} = req.params;
    const decoded = verifyToken(token,process.env.EMAIL_TOKEN);
    const user =await userModel.updateOne({email:decoded.email},{confirmEmail:true});
    return res.json({message:'success'});
}