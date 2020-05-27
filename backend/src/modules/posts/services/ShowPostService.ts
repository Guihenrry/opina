import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPostsRepository from '../repositories/IPostsRepository';
import Post from '../infra/typeorm/entities/Post';

interface IRequest {
  id: string;
}

@injectable()
class ShowPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Post> {
    const post = await this.postsRepository.findById(id, [
      'opinions',
      'images',
      'category',
    ]);

    if (!post) {
      throw new AppError('Post not found', 404);
    }

    return post;
  }
}

export default ShowPostService;
