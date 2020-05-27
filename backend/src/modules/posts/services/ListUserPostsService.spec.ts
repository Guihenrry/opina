import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import AppError from '@shared/errors/AppError';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import ListUserPostsService from './ListUserPostsService';

let fakeUsersRepository: FakeUsersRepository;
let fakePostsRepository: FakePostsRepository;
let listUserPosts: ListUserPostsService;

describe('ListUserPots', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakePostsRepository = new FakePostsRepository();
    listUserPosts = new ListUserPostsService(
      fakeUsersRepository,
      fakePostsRepository,
    );
  });

  it('should be able to list user posts', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const post1 = await fakePostsRepository.create({
      category_id: 'category',
      user_id: user.id,
      title: 'Tilte',
      description: 'Description',
      images: [
        {
          filename: 'image.jpg',
        },
      ],
    });

    const post2 = await fakePostsRepository.create({
      category_id: 'category',
      user_id: user.id,
      title: 'Post 2',
      description: 'Description',
      images: [
        {
          filename: 'image.jpg',
        },
      ],
    });

    const userPosts = await listUserPosts.execute({
      user_id: user.id,
    });

    expect(userPosts).toEqual([post1, post2]);
  });

  it('should not be able to list user post if non-existing user', async () => {
    await expect(
      listUserPosts.execute({
        user_id: 'non-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
