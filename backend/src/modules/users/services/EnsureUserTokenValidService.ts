import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUserTokenProvider from '../providers/UserTokenProvider/models/IUserTokenProvider';

interface IResponse {
  user_id: string;
}

@injectable()
class EnsureUserTokenValidService {
  constructor(
    @inject('UserTokenProvider')
    private userTokenProvider: IUserTokenProvider,
  ) {}

  public async execute(token: string): Promise<IResponse> {
    const user_id = this.userTokenProvider.getUserIdByToken(token);

    if (!user_id) {
      throw new AppError('Invalid JWT token', 401);
    }

    return {
      user_id,
    };
  }
}

export default EnsureUserTokenValidService;
