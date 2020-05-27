import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO';
import { Repository, getRepository } from 'typeorm';
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

  public async findByUserId(user_id: string): Promise<Post[]> {
    return this.ormRepository.find({
      where: { user_id },
      relations: ['category', 'images'],
    });
  }
}

export default PostsRepository;
