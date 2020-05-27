import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import Post from '../infra/typeorm/entities/Post';
import IPostsRepository from '../repositories/IPostsRepository';
import ICategoryRepository from '../repositories/ICategoryRepository';

interface IFileImage {
  filename: string;
}

interface IRequest {
  user_id: string;
  title: string;
  description: string;
  category?: string;
  images: IFileImage[];
}

@injectable()
class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    title,
    description,
    category,
    images,
  }: IRequest): Promise<Post> {
    if (images.length === 0) {
      throw new AppError('Image is required to create a post.');
    }

    if (!title) {
      this.storageProvider.deleteTmpFiles(images);
      throw new AppError('Title is required to create a post.');
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      this.storageProvider.deleteTmpFiles(images);
      throw new AppError('Only authenticated user can create posts.', 401);
    }

    let category_id = null;

    if (category) {
      const categoryExist = await this.categoryRepository.findCategoryByTitle(
        category,
      );

      if (categoryExist) {
        category_id = categoryExist.id;
      } else {
        const newCategory = await this.categoryRepository.create({
          title: category,
        });

        category_id = newCategory.id;
      }
    }

    const post = this.postsRepository.create({
      user_id: user.id,
      title,
      description,
      category_id,
      images,
    });

    await this.storageProvider.saveFiles(images);

    return post;
  }
}

export default CreatePostService;
