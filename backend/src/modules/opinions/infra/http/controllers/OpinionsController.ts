import { Request, Response } from 'express';
import ListPostOpinionsService from '@modules/opinions/services/ListPostOpinionsService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class OpinionsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.params;

    const listPostOpinions = container.resolve(ListPostOpinionsService);

    const opinions = await listPostOpinions.execute({
      post_id,
    });

    return response.json(classToClass(opinions));
  }
}

export default OpinionsController;
