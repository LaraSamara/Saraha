import Joi from "joi";
const dataMethod =['body','params','query','headers','file'];
export const generalData ={
    email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
    password:Joi.string().required(),
    file:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size:Joi.number().positive().required(),
        dest:Joi.string()
    }),
    id:Joi.string().min(24).max(24).required()
}
export const validation =(schema)=>{
    return (req,res,next)=>{
    const validationArray = [];
    dataMethod.forEach(key=>{
        if(schema[key]){
            const validationResults = schema[key].validate(req[key],{abortearly:false});
            if(validationResults.error){
                validationArray.push(validationResults.error.details);
            }
        }
    });
    if(validationArray.length>0){
        return res.json({message:validationArray}) ;
    }else{
        next();
    }
    }

}
