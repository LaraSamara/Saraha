import mongoose, { Schema,model,Types } from "mongoose";
const commentSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        required:true,
        ref:'User'
    },
    postId:{
        type:Types.ObjectId,
        required:true,
        ref:'Post'
    },
    text:{
        type:String,
        required:true
    },
    image:{
        type:Object
    },
    like:[{
        type:Types.ObjectId,
        ref:'User'
    }],
    unLike:[{
        type:Types.ObjectId,
        ref:'User'
    }],
    totalVote:{
        type:Number,
        default:0
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{new:true});
const postModel = mongoose.models.Comment || model('Comment',commentSchema);
export default postModel;