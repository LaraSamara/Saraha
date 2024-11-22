export const asyncHandller = (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(error=>{
            return next(new Error({error}));
        })
    }
}
export const globalErrorHandling =(err,req,res,next)=>{
    if(err){
        return res.json({message:err.message,err:err.stack});
    }
}