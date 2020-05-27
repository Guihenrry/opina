import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListUserPotsService from '@modules/posts/services/ListUserPostsService';
import DeleteUserPostService from '@modules/posts/services/DeleteUserPostService';

class UserPostsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUserPots = container.resolve(ListUserPotsService);

    const posts = await listUserPots.execute({
      user_id,
    });

    return response.json(posts);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const deleteUserPost = container.resolve(DeleteUserPostService);

    await deleteUserPost.execute({
      id,
      user_id,
    });

    return response.status(204).send();
  }
}

export default UserPostsController;
