import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Opinion from '../infra/typeorm/entities/Opinion';
import IOpinionsRepository from '../repositories/IOpinionsRepository';

interface IRequest {
  text: string;
  opinion_id: string;
  user_id: string;
}

@injectable()
class UpdateOpinionService {
  constructor(
    @inject('OpinionsRepository')
    private opinionsRepository: IOpinionsRepository,
  ) {}

  public async execute({
    text,
    opinion_id,
    user_id,
  }: IRequest): Promise<Opinion> {
    const opinion = await this.opinionsRepository.findById(opinion_id);

    if (!opinion) {
      throw new AppError('Opinion not exists');
    }

    if (user_id !== opinion.user_id) {
      throw new AppError('You are not allowed to edit this review', 401);
    }

    opinion.text = text;

    return this.opinionsRepository.save(opinion);
  }
}

export default UpdateOpinionService;
