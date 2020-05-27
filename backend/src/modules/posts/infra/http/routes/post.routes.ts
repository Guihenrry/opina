import { Router } from 'express';
import multer from 'multer';

import storageConfig from '@config/storage';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import PostsController from '../controllers/PostsController';
import UserPostsController from '../controllers/UserPostsController';

const upload = multer(storageConfig.multer);

const postRouter = Router();
const postsController = new PostsController();
const userPostsController = new UserPostsController();

postRouter.use(ensureAuthenticated);

postRouter.post('/', upload.array('images', 5), postsController.create);
postRouter.get('/me', userPostsController.index);
postRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid(),
    },
  }),
  userPostsController.delete,
);

export default postRouter;
