import jwt from "jsonwebtoken";
export const generateToken = (payload,signiture= process.env.TOKEN_SIGNITURE,expiresIn="1h")=>{
    const token = jwt.sign(payload,signiture,{expiresIn});
    return token;
}
export const verifyToken = (token,signiture=process.env.TOKEN_SIGNITURE)=>{
    const decoded = jwt.verify(token,signiture);
    return decoded;
}