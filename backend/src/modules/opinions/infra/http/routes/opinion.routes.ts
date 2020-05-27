import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UserOpinionsController from '../controllers/UserOpinionsController';

const opinionRouter = Router();

const userOpinionsController = new UserOpinionsController();

opinionRouter.use(ensureAuthenticated);

opinionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      text: Joi.string().required(),
      post_id: Joi.string().uuid().required(),
    },
  }),
  userOpinionsController.create,
);

opinionRouter.put(
  '/:opinion_id',
  celebrate({
    [Segments.BODY]: {
      text: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      opinion_id: Joi.string().uuid(),
    },
  }),
  userOpinionsController.update,
);

opinionRouter.delete(
  '/:opinion_id',
  celebrate({
    [Segments.PARAMS]: {
      opinion_id: Joi.string().uuid(),
    },
  }),
  userOpinionsController.delete,
);

export default opinionRouter;
