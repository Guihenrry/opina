import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IPostsRepository from '../repositories/IPostsRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteUserPostService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<void> {
    const post = await this.postsRepository.findById(id, ['images']);

    if (!post) {
      throw new AppError('Post not exists');
    }

    if (post.user_id !== user_id) {
      throw new AppError('You are not allowed to delete this post');
    }

    await this.storageProvider.deleteFiles(post.images);
    await this.postsRepository.deletePostById(id);
  }
}

export default DeleteUserPostService;
