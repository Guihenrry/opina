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
    user_id,
  }: ICreatePostDTO): Promise<Post> {
    const post = new Post();

    Object.assign(post, {
      id: uuid(),
      title,
      description,
      images,
      category_id,
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.posts.push(post);

    return post;
  }

  public async findById(id: string): Promise<Post | undefined> {
    return this.posts.find(post => post.id === id);
  }

  public async findByUserId(user_id: string): Promise<Post[]> {
    return this.posts.filter(post => post.user_id === user_id);
  }

  public async deletePostById(id: string): Promise<void> {
    this.posts = this.posts.filter(post => post.id !== id);
  }
}

export default FakePostsRepository;
