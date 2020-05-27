import { injectable, inject } from 'tsyringe';
import Post from '../infra/typeorm/entities/Post';

import IPostsRepository from '../repositories/IPostsRepository';

interface IRequest {
  page: number;
  per_page: number;
  category_id?: string;
}

@injectable()
class ListPostsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({
    page,
    per_page,
    category_id,
  }: IRequest): Promise<Post[]> {
    const posts = await this.postsRepository.findWithPagination({
      per_page,
      page,
      category_id,
    });

    return posts;
  }
}

export default ListPostsService;
