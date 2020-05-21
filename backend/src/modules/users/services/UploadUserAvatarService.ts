import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  filename: string;
}

@injectable()
class UploadUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, filename }: IRequest): Promise<void> {
    console.log(user_id);
    console.log(filename);
  }
}

export default UploadUserAvatarService;
