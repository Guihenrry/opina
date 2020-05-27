import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import Opinion from '../infra/typeorm/entities/Opinion';
import IOpinionsRepository from '../repositories/IOpinionsRepository';

interface IRequest {
  text: string;
  post_id: string;
  user_id: string;
}

@injectable()
class CreateOpinionService {
  constructor(
    @inject('OpinionsRepository')
    private opinionsRepository: IOpinionsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ text, post_id, user_id }: IRequest): Promise<Opinion> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated user can change avatar.', 401);
    }

    const post = await this.postsRepository.findById(post_id);

    if (!post) {
      throw new AppError('Post not exists');
    }

    const opinion = await this.opinionsRepository.create({
      text,
      post_id,
      user_id,
    });

    return opinion;
  }
}

export default CreateOpinionService;
