import ICategoryRepository from '@modules/posts/repositories/ICategoryRepository';
import ICreateCategoryDTO from '@modules/posts/dtos/ICreateCategoryDTO';
import { Repository, getRepository } from 'typeorm';
import Category from '../entities/Category';

class CategoryRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create({ title }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({
      title,
    });

    return this.ormRepository.save(category);
  }

  public async findCategoryByTitle(
    title: string,
  ): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: { title },
    });

    return category;
  }
}

export default CategoryRepository;
