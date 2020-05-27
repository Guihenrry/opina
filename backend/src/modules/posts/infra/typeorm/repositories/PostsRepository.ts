import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';
import { Repository, getRepository } from 'typeorm';
import IFindWithPaginationDTO from '@modules/posts/dtos/IFindWithPaginationDTO';
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

  public async findById(id: string): Promise<Post | undefined> {
    return this.ormRepository.findOne({
      where: { id },
      relations: ['images', 'user'],
    });
  }

  public async findByUserId(user_id: string): Promise<Post[]> {
    return this.ormRepository.find({
      where: { user_id },
      relations: ['category', 'images'],
    });
  }

  public async deletePostById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findWithPagination({
    page,
    per_page,
    category_id,
  }: IFindWithPaginationDTO): Promise<Post[]> {
    const skip = (page - 1) * per_page;

    return this.ormRepository.find({
      skip,
      take: per_page,
      ...(category_id ? { where: { category_id } } : {}),
      relations: ['images', 'user'],
      order: {
        created_at: 'DESC',
      },
    });
  }
}

export default PostsRepository;
