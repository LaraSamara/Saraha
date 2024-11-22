import postModel from '../../../../DB/model/post.model.js';
import cloudinary from '../../../services/cloudinary.js';
import commentModel from '../../../../DB/model/comment.model.js';
export const createPost = async(req,res,next)=>{
    const {title,caption} = req.body;
    const id = req.id;
    const {public_id,secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:`post/${id}`});
    const user = await postModel.create({title,caption,image:{secure_url,public_id},userId:id});
    return res.json({message:'success',user});
}
export const likePost = async(req,res,next)=>{
    const id = req.id;
    const postId = req.params.id;
    const post = await postModel.findByIdAndUpdate(postId,{
        $addToSet:{like:id},
        $pull:{unlike:id}
    },{new:true});
    post.totalVote = post.like.length - post.unlike.length;
    await post.save();
    return res.json({message:'success',post});
}
export const unlikePost = async (req,res,next)=>{
    const id = req.id;
    const postId= req.params.id;
    const post = await postModel.findByIdAndUpdate(postId,{
        $addToSet:{unlike:id},
        $pull:{like:id}
    },{new:true});
    post.totalVote = post.like.length - post.unlike.length;
    await post.save();
    return res.json({message:'success',post});
}
export const getPost = async (req,res,next)=>{
    const cursor =  postModel.find({}).populate([{
        path:'userId',
        select:'userName'
    },{
        path:'like',
        select:'userName'
    },
{
    path:'unlike',
    select:'userName'
}]).cursor();
const postList =[];
for(let doc=await cursor.next();doc!=null;doc=await cursor.next()){
    const comment = await commentModel.find({postId:doc._id});
    postList.push({post:doc,comment});
}
return res.json({message:'success',postList})
}