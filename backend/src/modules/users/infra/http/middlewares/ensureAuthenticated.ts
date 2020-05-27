import AppError from '@shared/errors/AppError';
import { container } from 'tsyringe';
import { Request, Response, NextFunction } from 'express';

import EnsureUserTokenValidService from '@modules/users/services/EnsureUserTokenValidService';

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  const ensureUserTokenValid = container.resolve(EnsureUserTokenValidService);

  const { user_id } = await ensureUserTokenValid.execute(token);

  request.user = {
    id: user_id,
  };

  next();
}

export default ensureAuthenticated;
