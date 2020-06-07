import { injectable, inject } from 'tsyringe';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import AppError from '@shared/errors/AppError';
import IOpinionsRepository from '../repositories/IOpinionsRepository';
import Opinion from '../infra/typeorm/entities/Opinion';

interface IRequest {
  post_id: string;
}

@injectable()
class ListPostOpinionsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('OpinionsRepository')
    private opinionsRepository: IOpinionsRepository,
  ) {}

  public async execute({ post_id }: IRequest): Promise<Opinion[]> {
    const post = await this.postsRepository.findById(post_id);

    if (!post) {
      throw new AppError('Post not exists');
    }

    const opinions = await this.opinionsRepository.findByPostId(post_id);

    return opinions;
  }
}

export default ListPostOpinionsService;
