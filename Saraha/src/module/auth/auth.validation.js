import Joi from 'joi';
import { generalData } from '../../middleware/validation.js';
export const signupSchema = {
    body:Joi.object({
        userName:Joi.string().alphanum().required(),
        email:generalData.email,
        password:generalData.password,
        confirmPassword:generalData.password.valid(Joi.ref('password'))
    })
}
export const signinSchema = {
    body:Joi.object({
        email:generalData.email,
        password:generalData.password
    })
}