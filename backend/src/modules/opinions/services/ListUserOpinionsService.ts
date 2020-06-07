import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IOpinionsRepository from '../repositories/IOpinionsRepository';
import Opinion from '../infra/typeorm/entities/Opinion';

interface IRequest {
  user_id: string;
}

@injectable()
class ListUserOpinionsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('OpinionsRepository')
    private opinionsRepository: IOpinionsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Opinion[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError(
        'Only authenticated user can list user opinions.',
        401,
      );
    }

    const opinions = await this.opinionsRepository.findByUserId(user_id);

    return opinions;
  }
}

export default ListUserOpinionsService;
