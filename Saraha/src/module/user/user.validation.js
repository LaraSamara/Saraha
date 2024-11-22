import Joi from "joi";
import { generalData } from "../../middleware/validation.js";
export const coverPicSchema = {
    file:generalData.file.required()
}
export const shareProfileSchema ={
    params:Joi.object({
    id:generalData.id
    }).required()
}
export const updatePassword ={
    body:Joi.object({
        oldPassword:generalData.password,
        newPassword:generalData.password.invalid(Joi.ref('oldPassword')),
        confirmNewPassword:generalData.password.valid(Joi.ref('newPassword'))
    }).required()
}