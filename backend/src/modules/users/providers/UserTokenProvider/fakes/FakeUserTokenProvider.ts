import IUserTokenProvider from '../models/IUserTokenProvider';

class FakeJwtTokenProvider implements IUserTokenProvider {
  private tokens: string[] = [];

  public generateToken(user_id: string): string {
    this.tokens.push(user_id);
    return user_id;
  }

  public getUserIdByToken(token: string): string | undefined {
    return this.tokens.find(findToken => findToken === token);
  }
}

export default FakeJwtTokenProvider;
