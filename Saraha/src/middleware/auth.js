import userModel from "../../DB/model/user.model.js";
import { verifyToken } from "../services/generateAndVerifyToken.js";
export const auth = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization?.startsWith(process.env.BEARER_KEY)){
        return res.json ({message:"Bearer is required"});
    }
    const token = authorization.split(process.env.BEARER_KEY)[1];
    if(!token){
        return res.json({message:"token is required"});
    }
    const decoded = verifyToken(token);
    const user = userModel.findById(decoded.id);
    if(!user){
        return res.json({message:"not registered account"});
    }
    req.id = decoded.id;
    next();
}