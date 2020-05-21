import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UploadUserAvatarService from './UploadUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let uploadUserAvatar: UploadUserAvatarService;

describe('UploadUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    uploadUserAvatar = new UploadUserAvatarService(fakeUsersRepository);
  });

  it('should be able to upload user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'user-name',
      email: 'user@email.com',
      password: 'password',
    });

    await uploadUserAvatar.execute({
      user_id: user.id,
      filename: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });
});
