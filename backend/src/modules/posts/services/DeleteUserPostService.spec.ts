import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import DeleteUserPostService from './DeleteUserPostService';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakePostsRepository: FakePostsRepository;
let fakeStorageProvider: FakeStorageProvider;
let deleteUserPost: DeleteUserPostService;

describe('DeleteUserPost', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakePostsRepository = new FakePostsRepository();
    fakeStorageProvider = new FakeStorageProvider();

    deleteUserPost = new DeleteUserPostService(
      fakeUsersRepository,
      fakePostsRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to delete user post', async () => {
    const deletePostById = jest.spyOn(fakePostsRepository, 'deletePostById');
    const deleteFiles = jest.spyOn(fakeStorageProvider, 'deleteFiles');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      title: 'Title',
      description: 'description',
      category_id: 'category',
      images: [{ filename: 'image.jpg' }],
    });

    await deleteUserPost.execute({
      id: post.id,
      user_id: user.id,
    });

    expect(deletePostById).toHaveBeenCalledWith(post.id);
    expect(deleteFiles).toHaveBeenCalled();
  });

  it('should not be able to delete user post if non-existing id', async () => {
    await expect(
      deleteUserPost.execute({
        id: 'non-existing',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete user post if user_id is different', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      title: 'Title',
      description: 'description',
      category_id: 'category',
      images: [{ filename: 'image.jpg' }],
    });

    await expect(
      deleteUserPost.execute({
        id: post.id,
        user_id: 'different-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
