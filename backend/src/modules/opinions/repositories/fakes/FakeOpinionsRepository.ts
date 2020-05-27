import ICreateOpinionDTO from '@modules/opinions/dtos/ICreateOpinionDTO';
import Opinion from '@modules/opinions/infra/typeorm/entities/Opinion';
import { uuid } from 'uuidv4';
import IOpinionsRepository from '../IOpinionsRepository';

class FakeOpinionsRepository implements IOpinionsRepository {
  private opinions: Opinion[] = [];

  public async create({
    text,
    post_id,
    user_id,
  }: ICreateOpinionDTO): Promise<Opinion> {
    const opinion = new Opinion();

    Object.assign(opinion, {
      id: uuid(),
      text,
      post_id,
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.opinions.push(opinion);

    return opinion;
  }

  public async findById(id: string): Promise<Opinion | undefined> {
    return this.opinions.find(opinion => opinion.id === id);
  }

  public async save(opinion: Opinion): Promise<Opinion> {
    const findIndex = this.opinions.findIndex(
      findOpinion => findOpinion.id === opinion.id,
    );

    this.opinions[findIndex] = opinion;

    return opinion;
  }

  public async deleteById(id: string): Promise<void> {
    const findIndex = this.opinions.findIndex(
      findOpinion => findOpinion.id === id,
    );

    this.opinions.splice(findIndex, 1);
  }
}

export default FakeOpinionsRepository;
