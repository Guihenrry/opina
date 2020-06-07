import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeOpinionsRepository from '../repositories/fakes/FakeOpinionsRepository';
import ListUserOpinionsService from './ListUserOpinionsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeOpinionsRepository: FakeOpinionsRepository;
let listUserOpinions: ListUserOpinionsService;

describe('ListUserOpinions', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeOpinionsRepository = new FakeOpinionsRepository();
    listUserOpinions = new ListUserOpinionsService(
      fakeUsersRepository,
      fakeOpinionsRepository,
    );
  });

  it('Should be able to list opinions by user id', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const opinion1 = await fakeOpinionsRepository.create({
      post_id: 'postid',
      text: 'opinion1',
      user_id: user.id,
    });

    const opinion2 = await fakeOpinionsRepository.create({
      post_id: 'postid',
      text: 'opinion2',
      user_id: user.id,
    });

    await fakeOpinionsRepository.create({
      post_id: 'postid',
      text: 'opinion2',
      user_id: 'other-user-id',
    });

    const opinions = await listUserOpinions.execute({
      user_id: user.id,
    });

    expect(opinions).toEqual([opinion1, opinion2]);
  });

  it('should not be able to list opinions by user id if non-existing user', async () => {
    await expect(
      listUserOpinions.execute({
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
