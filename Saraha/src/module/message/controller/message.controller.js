import messageModel from '../../../../DB/model/message.model.js';
import userModel from '../../../../DB/model/user.model.js';
export const sendMessage= async(req,res,next)=>{
    const {message} = req.body;
    const {receiverId}= req.params;
    const user = userModel.findById(receiverId);
    if(!user){
        return next(new Error("user not found"));
    }
    const createMessage =await messageModel.create({message,receiverId});
    return res.json({message:"success",message:createMessage});
}
export const getMessages = async(req,res,next)=>{
    const messages =await messageModel.find({receiverId:req.id});
    return res.json({messages});
}
export const deletMessage = async(req,res,next)=>{
    const id = req.id;
    const {messageId}=req.params;
    const message = await messageModel.deleteOne({_id:messageId,receiverId:id});
    if(message.deletedCount == 0){
        return next(new Error("message not exist"));
    }
    return res.json({message:"success",message});
}