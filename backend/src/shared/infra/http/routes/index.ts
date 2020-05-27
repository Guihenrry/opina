import { Router } from 'express';

import userRouter from '@modules/users/infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import postRouter from '@modules/posts/infra/http/routes/post.routes';
import opinionRouter from '@modules/opinions/infra/http/routes/opinion.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/posts', postRouter);
routes.use('/opinions', opinionRouter);

export default routes;
