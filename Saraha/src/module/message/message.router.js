import { Router } from "express";
import * as messageController from './controller/message.controller.js';
import {auth} from '../../middleware/auth.js';
import {asyncHandller} from '../../services/errorHandling.js';
const router = Router();
router.post('/:receiverId',messageController.sendMessage);
router.get('/',auth,asyncHandller(messageController.getMessages));
router.delete('/:messageId',auth,asyncHandller(messageController.deletMessage));
export default router;