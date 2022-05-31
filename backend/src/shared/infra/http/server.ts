import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';

import '@shared/infra/typeorm';
import '@shared/container';
import storageConfig from '@config/storage';
import corsConfig from '@config/cors';
import routes from './routes';
import exceptionHandling from './middlewares/exceptionHandling';

const app = express();
app.use(cors(corsConfig));
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(exceptionHandling);
app.use('/files', express.static(storageConfig.uploadsFolder));

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`🚀 server started in port ${port}`);
});
