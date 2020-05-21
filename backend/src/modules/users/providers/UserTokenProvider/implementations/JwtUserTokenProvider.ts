import { sign, verify } from 'jsonwebtoken';

import jwtConfig from '@config/jwt';
import IUserTokenProvider from '../models/IUserTokenProvider';

interface ITokenPayload {
  sub: string;
}

class JwtUserTokenProvider implements IUserTokenProvider {
  public generateToken(user_id: string): string {
    const { secret, expiresIn } = jwtConfig;

    const token = sign({}, secret, {
      subject: user_id,
      expiresIn,
    });

    return token;
  }

  public getUserIdByToken(token: string): string | undefined {
    const { secret } = jwtConfig;

    try {
      const decoded = verify(token, secret);

      const { sub } = decoded as ITokenPayload;

      return sub;
    } catch {
      return undefined;
    }
  }
}

export default JwtUserTokenProvider;
