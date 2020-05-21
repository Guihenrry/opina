import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UploadUserAvatarService from './UploadUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let uploadUserAvatar: UploadUserAvatarService;

describe('UploadUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    uploadUserAvatar = new UploadUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'user-name',
      email: 'user@email.com',
      password: 'password',
    });

    await uploadUserAvatar.execute({
      user_id: user.id,
      filename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update user avatar id non existing user', async () => {
    await expect(
      uploadUserAvatar.execute({
        user_id: 'non-existing-user',
        filename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete old avatar on add new avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'user-name',
      email: 'user@email.com',
      password: 'password',
    });

    await uploadUserAvatar.execute({
      user_id: user.id,
      filename: 'old-image.jpg',
    });

    await uploadUserAvatar.execute({
      user_id: user.id,
      filename: 'new-image.jpg',
    });

    expect(deleteFile).toBeCalledWith('old-image.jpg');
    expect(user.avatar).toBe('new-image.jpg');
  });
});
