import Post from '@modules/posts/infra/typeorm/entities/Post';
import { uuid } from 'uuidv4';
import ICreatePostDTO from '../../dtos/ICreatePostDTO';
import IPostsRepository from '../IPostsRepository';

class FakePostsRepository implements IPostsRepository {
  private posts: Post[] = [];

  public async create({
    title,
    description,
    images,
    category_id,
  }: ICreatePostDTO): Promise<Post> {
    const post = new Post();

    Object.assign(post, {
      id: uuid(),
      title,
      description,
      images,
      category_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.posts.push(post);

    return post;
  }
}

export default FakePostsRepository;
