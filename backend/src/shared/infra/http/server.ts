import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';

import '@shared/infra/typeorm';
import '@shared/container';
import routes from './routes';
import exceptionHandling from './middlewares/exceptionHandling';

const app = express();
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(exceptionHandling);

app.listen(3333, () => {
  console.log('🚀 server started in port 3333');
});
