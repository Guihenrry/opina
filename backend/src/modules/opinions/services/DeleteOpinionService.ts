import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IOpinionsRepository from '../repositories/IOpinionsRepository';

interface IRequest {
  opinion_id: string;
  user_id: string;
}

@injectable()
class DeleteOpinionService {
  constructor(
    @inject('OpinionsRepository')
    private opinionsRepository: IOpinionsRepository,
  ) {}

  public async execute({ opinion_id, user_id }: IRequest): Promise<void> {
    const opinion = await this.opinionsRepository.findById(opinion_id);

    if (!opinion) {
      throw new AppError('Opinion not exists');
    }

    if (user_id !== opinion.user_id) {
      throw new AppError('You are not allowed to edit this review', 401);
    }

    await this.opinionsRepository.deleteById(opinion_id);
  }
}

export default DeleteOpinionService;
