import { Router } from 'express';
import multer from 'multer';

import storageConfig from '@config/storage';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PostsController from '../controllers/PostsController';

const upload = multer(storageConfig.multer);

const postRouter = Router();
const postsController = new PostsController();

postRouter.use(ensureAuthenticated);

postRouter.post('/', upload.array('images', 5), postsController.create);

export default postRouter;
