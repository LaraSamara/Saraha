import cloudinary from "../../../services/cloudinary.js";
import commentModel from '../../../../DB/model/comment.model.js';
export const createCommect = async(req,res,next)=>{
    const{text}=req.body;
    req.body.postId=req.params.id;
    req.body.userId =req.id;
    if(req.file){
        const {secure_url,public_id} =await cloudinary.uploader.upload(req.file.path,{folder:`comment`});
        req.body.image ={secure_url,public_id};
    }
    const comment = await commentModel.create(req.body);
    return res.json({message:"success",comment});
}