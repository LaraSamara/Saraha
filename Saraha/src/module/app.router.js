import { connectDB } from "../../DB/connection.js";
import authRouter from "./auth/auth.router.js";
import userRouter from "./user/user.router.js";
import messageRouter from "./message/message.router.js";
import postRouter from '../module/post/post.router.js';
import { globalErrorHandling } from "../services/errorHandling.js";
import path from 'path';
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fullPath = path.join(__dirname,'../Uploads')
export const initApp = (app,express)=>{
    connectDB();
    app.use(express.json());
    app.use('/Uploads',express.static(fullPath));
    app.use("/auth",authRouter);
    app.use("/user",userRouter);
    app.use("/message",messageRouter);
    app.use('/post',postRouter)
    app.use("*",(req,res)=>{
        return res.status(404).json({message:"Page Not Found"});
    });
    app.use(globalErrorHandling);
}