import AppError from '@shared/errors/AppError';

import EnsureUserTokenValidService from './EnsureUserTokenValidService';
import FakeUserTokenProvider from '../providers/UserTokenProvider/fakes/FakeUserTokenProvider';

let fakeUserTokenProvider: FakeUserTokenProvider;
let ensureUserTokenValid: EnsureUserTokenValidService;

describe('EnsureUserTokenValid', () => {
  beforeEach(() => {
    fakeUserTokenProvider = new FakeUserTokenProvider();
    ensureUserTokenValid = new EnsureUserTokenValidService(
      fakeUserTokenProvider,
    );
  });

  it('should be able to valid user token', async () => {
    const token = fakeUserTokenProvider.generateToken('user-id');

    const { user_id } = await ensureUserTokenValid.execute(token);

    expect(user_id).toBe('user-id');
  });

  it('should not be able to valid user with invalid token', async () => {
    await expect(
      ensureUserTokenValid.execute('invalid-token'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
