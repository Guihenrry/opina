import Opinion from '../infra/typeorm/entities/Opinion';
import ICreateOpinionDTO from '../dtos/ICreateOpinionDTO';

export default interface IOpinionsRepository {
  create(data: ICreateOpinionDTO): Promise<Opinion>;
  findById(id: string): Promise<Opinion | undefined>;
  save(opinion: Opinion): Promise<Opinion>;
  deleteById(id: string): Promise<void>;
}
