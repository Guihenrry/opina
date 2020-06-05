import { injectable, inject } from 'tsyringe';
import Post from '../infra/typeorm/entities/Post';

import IPostsRepository from '../repositories/IPostsRepository';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IRequest {
  page: number;
  per_page: number;
  category?: string;
  title?: string;
}

interface IResponse {
  posts: Post[];
  total: number;
}

@injectable()
class ListPostsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  public async execute({
    page,
    per_page,
    category,
    title,
  }: IRequest): Promise<IResponse> {
    let category_id;

    if (category) {
      const findCategory = await this.categoryRepository.findCategoryByTitle(
        category,
      );

      category_id = findCategory?.id;
    }

    const { posts, total } = await this.postsRepository.findWithPagination({
      per_page,
      page,
      category_id,
      title,
    });

    return {
      posts,
      total,
    };
  }
}

export default ListPostsService;
