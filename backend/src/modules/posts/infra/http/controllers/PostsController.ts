import { Request, Response } from 'express';
import ListPostsService from '@modules/posts/services/ListPostsService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ShowPostService from '@modules/posts/services/ShowPostService';

export default class PostsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page, per_page, category, title } = request.query;

    const listPosts = container.resolve(ListPostsService);

    const { posts, total } = await listPosts.execute({
      page: Number(page),
      per_page: Number(per_page),
      category: typeof category === 'string' ? category : undefined,
      title: typeof title === 'string' ? title : undefined,
    });

    response.header('X-Total-Count', String(total));

    return response.json(classToClass(posts));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showPost = container.resolve(ShowPostService);
    const post = await showPost.execute({ id });

    return response.json(classToClass(post));
  }
}
