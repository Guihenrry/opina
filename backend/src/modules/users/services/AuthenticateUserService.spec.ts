import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserTokenProvider from '../providers/UserTokenProvider/fakes/FakeUserTokenProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeUserTokenProvider: FakeUserTokenProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUserTokenProvider = new FakeUserTokenProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeUserTokenProvider,
    );
  });

  it('should be able to authenticated user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate if non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'non-existing-email',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user if incorect password', async () => {
    await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'incorect-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
