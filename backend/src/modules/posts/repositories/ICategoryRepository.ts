import Category from '../infra/typeorm/entities/Category';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';

export default interface ICategoryRepository {
  findCategoryByTitle(title: string): Promise<Category | undefined>;
  create(data: ICreateCategoryDTO): Promise<Category>;
}
