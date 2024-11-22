import userModel from "../../../../DB/model/user.model.js";
import cloudinary from "../../../services/cloudinary.js";
import { compare, hash } from "../../../services/hashAndCompare.js";

export const profilePic =async (req,res,next)=>{
    const profilePic =[];
    for(const file of req.files){
        profilePic.push(file.dest);
    }
    const user =await  userModel.updateOne({_id:req.id},{profilePic});
    return res.json({message:"success",user});
}
export const coverPic =async (req,res,next)=>{
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:`saraha/${req.id}/profile`});
    const user = await userModel.findByIdAndUpdate(req.id,{coverPic:secure_url,public_id},{new:false});
    if(user.public_id){
        await cloudinary.uploader.destroy(user.public_id);
    }
    return res.json({message:"success",user});
} 
export const shareProfile =async (req,res,next)=>{
    const user = await userModel.findById(req.params.id);
    if(!user){
        return next(new Error("user not fiund"));
    }else{
        return res.json({message:"success",user});
    }

}
export const updatePassword =async (req,res,next)=>{
    const {oldPassword,newPassword,confirmNewPassword}= req.body;
    const user = await userModel.findById(req.id);
    const match = compare(oldPassword,user.password);
    if(!match){
        return next(new Error("pasword not mstch"));
    }
    const hashValue = hash(newPassword);
    const updateUser = await userModel.updateOne({_id:req.id},{password:hashValue});
    return res.json({message:"success",user:updateUser});
}

