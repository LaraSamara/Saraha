import bcrypt from "bcryptjs";
export const hash = (plainText,saltRound = parseInt(process.env.SALT_ROUND))=>{
    const hashResult = bcrypt.hashSync(plainText,saltRound);
    return hashResult;
}
export const compare =(plainText, hashText)=>{
    const match = bcrypt.compareSync(plainText,hashText);
    return match;
}