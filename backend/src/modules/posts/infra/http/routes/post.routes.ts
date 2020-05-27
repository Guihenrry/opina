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

postRouter.get('/me', ensureAuthenticated, userPostsController.index);

postRouter.post(
  '/',
  ensureAuthenticated,
  upload.array('images', 5),
  userPostsController.create,
);

postRouter.delete(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid(),
    },
  }),
  userPostsController.delete,
);

postRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().default(1),
      per_page: Joi.number().default(9),
      category_id: Joi.string(),
    },
  }),
  postsController.index,
);

postRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid(),
    },
  }),
  postsController.show,
);

export default postRouter;
