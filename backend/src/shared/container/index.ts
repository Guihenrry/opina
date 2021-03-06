import { container } from 'tsyringe';

import './providers/StorageProvider';
import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import ICategoryRepository from '@modules/posts/repositories/ICategoryRepository';
import CategoryRepository from '@modules/posts/infra/typeorm/repositories/CategoryRepository';

import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import PostsRepository from '@modules/posts/infra/typeorm/repositories/PostsRepository';

import IOpinionsRepository from '@modules/opinions/repositories/IOpinionsRepository';
import OpinionsRepository from '@modules/opinions/infra/typeorm/repositories/OpinionsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository,
);

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository,
);

container.registerSingleton<IOpinionsRepository>(
  'OpinionsRepository',
  OpinionsRepository,
);
