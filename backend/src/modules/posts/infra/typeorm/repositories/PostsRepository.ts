import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';
import { Repository, getRepository, Like } from 'typeorm';
import IFindWithPaginationDTO from '@modules/posts/dtos/IFindWithPaginationDTO';
import IResponseFindWithPaginationDTO from '@modules/posts/dtos/IResponseFindWithPaginationDTO';
import Post from '../entities/Post';

class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async create({
    title,
    description,
    images,
    user_id,
    category_id,
  }: ICreatePostDTO): Promise<Post> {
    const post = this.ormRepository.create({
      title,
      description,
      images,
      user_id,
      category_id,
    });

    return this.ormRepository.save(post);
  }

  public async findById(
    id: string,
    relations?: string[],
  ): Promise<Post | undefined> {
    return this.ormRepository.findOne({
      where: { id },
      relations,
    });
  }

  public async findByUserId(user_id: string): Promise<Post[]> {
    return this.ormRepository.find({
      where: { user_id },
      relations: ['category', 'images'],
      order: {
        created_at: 'DESC',
      },
    });
  }

  public async deletePostById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findWithPagination({
    page,
    per_page,
    category_id,
    title,
  }: IFindWithPaginationDTO): Promise<IResponseFindWithPaginationDTO> {
    const skip = (page - 1) * per_page;

    const where = {
      ...(category_id ? { category_id } : {}),
      ...(title ? { title: Like(`%${title}%`) } : {}),
    };

    const [posts, total] = await this.ormRepository.findAndCount({
      skip,
      take: per_page,
      where,
      relations: ['images', 'user', 'opinions'],
      order: {
        created_at: 'DESC',
      },
    });

    return {
      posts,
      total,
    };
  }
}

export default PostsRepository;
