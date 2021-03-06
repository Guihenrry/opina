import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListUserOpinionsService from '@modules/opinions/services/ListUserOpinionsService';
import CreateOpinionService from '@modules/opinions/services/CreateOpinionService';
import UpdateOpinionService from '@modules/opinions/services/UpdateOpinionService';
import DeleteOpinionService from '@modules/opinions/services/DeleteOpinionService';
import { classToClass } from 'class-transformer';

export default class UserOpinionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listUserOpinions = container.resolve(ListUserOpinionsService);

    const opinions = await listUserOpinions.execute({
      user_id,
    });

    return response.json(classToClass(opinions));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { text, post_id } = request.body;

    const createOpinion = container.resolve(CreateOpinionService);

    const opinion = await createOpinion.execute({
      user_id,
      post_id,
      text,
    });

    return response.json(opinion);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { opinion_id } = request.params;
    const { text } = request.body;

    const updateOpinion = container.resolve(UpdateOpinionService);

    const opinion = await updateOpinion.execute({
      opinion_id,
      user_id,
      text,
    });

    return response.json(opinion);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { opinion_id } = request.params;

    const deleteOpinion = container.resolve(DeleteOpinionService);

    await deleteOpinion.execute({
      opinion_id,
      user_id,
    });

    return response.status(204).send();
  }
}
