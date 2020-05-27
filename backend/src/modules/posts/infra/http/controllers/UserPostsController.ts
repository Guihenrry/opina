import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListUserPotsService from '@modules/posts/services/ListUserPostsService';

class UserPostsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUserPots = container.resolve(ListUserPotsService);

    const posts = await listUserPots.execute({
      user_id,
    });

    return response.json(posts);
  }
}

export default UserPostsController;
