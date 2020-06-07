import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UserOpinionsController from '../controllers/UserOpinionsController';
import OpinionsController from '../controllers/OpinionsController';

const opinionRouter = Router();

const userOpinionsController = new UserOpinionsController();
const opinionsController = new OpinionsController();

opinionRouter.get(
  '/:post_id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      post_id: Joi.string().uuid(),
    }),
  }),
  opinionsController.show,
);

opinionRouter.get('/', ensureAuthenticated, userOpinionsController.index);

opinionRouter.post(
  '/',
  ensureAuthenticated,
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
  ensureAuthenticated,
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
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      opinion_id: Joi.string().uuid(),
    },
  }),
  userOpinionsController.delete,
);

export default opinionRouter;
