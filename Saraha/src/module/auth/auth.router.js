import {Router} from "express";
import * as authController from "../auth/controller/auth.controller.js";
import { asyncHandller } from "../../services/errorHandling.js";
import { validation } from "../../middleware/validation.js";
import * as validator from './auth.validation.js';
const router = Router();
router.post("/signup",validation(validator.signupSchema),asyncHandller(authController.signup));
router.post("/signin",validation(validator.signinSchema),asyncHandller(authController.signin));
router.get('/confirmEmail/:token',authController.confirmEmail);
export default router;

