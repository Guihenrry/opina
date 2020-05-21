import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jhondow@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('jhondow@example.com');
  });

  it('should not be able to create a new user with a same a email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'jhondow@example.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'jhondow@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new user with password hashed', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jhondow@example.com',
      password: '123456',
    });

    expect(generateHash).toHaveBeenCalledWith(user.password);
  });
});
