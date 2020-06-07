import ICreateOpinionDTO from '@modules/opinions/dtos/ICreateOpinionDTO';
import IOpinionsRepository from '@modules/opinions/repositories/IOpinionsRepository';
import { Repository, getRepository } from 'typeorm';
import Opinion from '../entities/Opinion';

class OpinionsRepository implements IOpinionsRepository {
  private ormRepository: Repository<Opinion>;

  constructor() {
    this.ormRepository = getRepository(Opinion);
  }

  public async create({
    text,
    post_id,
    user_id,
  }: ICreateOpinionDTO): Promise<Opinion> {
    const opinion = this.ormRepository.create({
      text,
      post_id,
      user_id,
    });

    return this.ormRepository.save(opinion);
  }

  public async findById(id: string): Promise<Opinion | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async save(opinion: Opinion): Promise<Opinion> {
    return this.ormRepository.save(opinion);
  }

  public async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findByPostId(post_id: string): Promise<Opinion[]> {
    const opinions = await this.ormRepository.find({
      where: { post_id },
      order: {
        created_at: 'DESC',
      },
      relations: ['user'],
    });

    return opinions;
  }

  public async findByUserId(user_id: string): Promise<Opinion[]> {
    const opinions = await this.ormRepository.find({
      where: { user_id },
      order: {
        created_at: 'DESC',
      },
      relations: ['post'],
    });

    return opinions;
  }
}

export default OpinionsRepository;
