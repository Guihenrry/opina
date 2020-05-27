import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakePostsRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import AppError from '@shared/errors/AppError';
import CreateOpinionService from './CreateOpinionService';
import FakeOpinionsRepository from '../repositories/fakes/FakeOpinionsRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakePostsRepository: FakePostsRepository;
let fakeOpinionsRepository: FakeOpinionsRepository;
let createOpinion: CreateOpinionService;

describe('CreateOpinion', () => {
  beforeEach(() => {
    fakeOpinionsRepository = new FakeOpinionsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakePostsRepository = new FakePostsRepository();
    createOpinion = new CreateOpinionService(
      fakeOpinionsRepository,
      fakeUsersRepository,
      fakePostsRepository,
    );
  });

  it('should be able to create a new opinion', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      title: 'Macbook',
      description: 'description',
      category_id: 'category',
      images: [],
    });

    const opinion = await createOpinion.execute({
      text: 'Gostei muito',
      post_id: post.id,
      user_id: user.id,
    });

    expect(opinion).toHaveProperty('id');
    expect(opinion.text).toBe('Gostei muito');
  });

  it('should not be able to create a new opinion if non-existing user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      title: 'Macbook',
      description: 'description',
      category_id: 'category',
      images: [],
    });

    await expect(
      createOpinion.execute({
        text: 'Gostei muito',
        post_id: post.id,
        user_id: 'non-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new opinion if non-existing post', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      createOpinion.execute({
        text: 'Gostei muito',
        post_id: 'non-existing',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
