import Post from '../infra/typeorm/entities/Post';

export default interface IResponseFindWithPaginationDTO {
  posts: Post[];
  total: number;
}
