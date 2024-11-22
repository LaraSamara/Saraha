import multer from "multer";
export const cloudinaryHME =(err,req,res,next)=>{
    if(err){
        return res.json({message:"multer error",err});
    }else{
        next();
    }
}
function fileUpload(customeValidation=[]){
    const storage = multer.diskStorage({});
    function fileFilter(req,file,cb){
        if(customeValidation.includes(file.mimetype)){
            cb(null,true);
        }else{
            cb('Invalid Formate',false);
        }
    }
    const upload =multer({fileFilter,storage});
    return upload;
}
export default fileUpload;