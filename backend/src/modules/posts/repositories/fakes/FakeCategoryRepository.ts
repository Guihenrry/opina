import ICreateCategoryDTO from '@modules/posts/dtos/ICreateCategoryDTO';
import Category from '@modules/posts/infra/typeorm/entities/Category';
import { uuid } from 'uuidv4';
import ICategoryRepository from '../ICategoryRepository';

class FakeCategoryRepository implements ICategoryRepository {
  private categories: Category[] = [];

  public async create({ title }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      id: uuid(),
      title,
      updated_at: new Date(),
      created_at: new Date(),
    });

    this.categories.push(category);

    return category;
  }

  public async findCategoryByTitle(
    title: string,
  ): Promise<Category | undefined> {
    const category = this.categories.find(
      categoryFind => categoryFind.title === title,
    );

    return category;
  }
}

export default FakeCategoryRepository;
