import multer from "multer";
import { nanoid } from "nanoid";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";
const __dirname =path.dirname(fileURLToPath(import.meta.url));
export const fileValidation = {
    image:['image/jpeg','image/gif','image/png'],
    file:['application/pdf']
}
export const HME = (err,req,res,next)=>{
    if(err){
        return res.json({message:"multer error",err});
    }
}
export function fileUpload(customePath="puplic",customeValidation =[]){
    const fullPath = path.join(__dirname,`../Uploads/${customePath}`);
    if(!fs.existsSync(fullPath)){
        fs.mkdirSync(fullPath,{recursive:true});
    }
    const storage = multer.diskStorage({
        destination:(req,res,cb)=>{
            cb(null,fullPath);
        },
        filename:(req,file,cb)=>{
            const suffixName = nanoid()+file.originalname;
            file.dest = `Uploads/${customePath}/${suffixName}`;
            cb(null,suffixName);
        }
    });
    function fileFilter (req,file,cb){
        if(customeValidation.includes(file.mimetype)){
            cb(null,true);
        }else{
            cb('invalid format',false);
        }
    }
    const upload = multer({fileFilter,storage});
    return upload;
}
