import { Request, Response } from 'express';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(classToClass(user));
  }
}
