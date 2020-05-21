import Router from 'express';
import { Joi, Segments, celebrate } from 'celebrate';

import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userRouter = Router();

const usersController = new UsersController();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6),
    },
  }),
  usersController.create,
);

userRouter.patch('/avatar', ensureAuthenticated, (request, response) => {
  const user_id = request.user.id;

  response.json({ user_id });
});

export default userRouter;
