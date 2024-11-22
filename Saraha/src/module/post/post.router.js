import { Router } from "express";
import * as postController from './controller/post.controller.js';
import {auth} from '.././../middleware/auth.js';
import fileUpload from '../../services/multerC.js'
import {fileValidation} from '../../services/multer.js';
import {asyncHandller} from '../../services/errorHandling.js';
import * as commentController from './controller/comment.controller.js';
const router = Router();
router.post('/',auth,fileUpload(fileValidation.image).single('image'),asyncHandller(postController.createPost));
router.patch('/:id/like',auth,postController.likePost);
router.patch('/:id/unlike',auth,postController.unlikePost);
router.post('/:id/comment',auth,fileUpload(fileValidation.image).single('image'),commentController.createCommect);
router.get('/',asyncHandller(postController.getPost));
export default router;