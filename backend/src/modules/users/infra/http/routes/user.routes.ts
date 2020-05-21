import Router from 'express';
import { Joi, Segments, celebrate } from 'celebrate';

import UsersController from '../controllers/UsersController';

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

export default userRouter;
