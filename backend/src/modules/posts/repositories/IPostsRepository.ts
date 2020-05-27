import Post from '../infra/typeorm/entities/Post';
import ICreatePostDTO from '../dtos/ICreatePostDTO';
import IFindWithPaginationDTO from '../dtos/IFindWithPaginationDTO';

export default interface IPostsRepository {
  create(data: ICreatePostDTO): Promise<Post>;
  findById(id: string, relations?: string[]): Promise<Post | undefined>;
  findByUserId(user_id: string): Promise<Post[]>;
  deletePostById(id: string): Promise<void>;
  findWithPagination(data: IFindWithPaginationDTO): Promise<Post[]>;
}
