import { Request, Response } from 'express';
import CreatePostService from '@modules/posts/services/CreatePostService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

interface IFileImage {
  filename: string;
}

export default class PostsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { title, description, category } = request.body;

    const createPost = container.resolve(CreatePostService);

    const images = request.files as IFileImage[];

    const post = await createPost.execute({
      user_id,
      images,
      title,
      description,
      category,
    });

    return response.json(classToClass(post));
  }
}
