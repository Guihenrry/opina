import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import CreatePostService from './CreatePostService';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';
import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';

let fakePostsRepository: FakePostsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCategoryRepository: FakeCategoryRepository;
let fakeStorageProvider: FakeStorageProvider;
let createPost: CreatePostService;

describe('CreatePost', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCategoryRepository = new FakeCategoryRepository();
    fakeStorageProvider = new FakeStorageProvider();

    createPost = new CreatePostService(
      fakePostsRepository,
      fakeUsersRepository,
      fakeCategoryRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to create a new post', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const post = await createPost.execute({
      user_id: user.id,
      title: 'Macbookpro',
      description:
        'Desta maneira, a valorização de fatores subjetivos facilita a criação do fluxo de informações.',
      category: 'Tecnologia',
      images: [
        {
          filename: 'image01.jpg',
        },
        {
          filename: 'image02.jpg',
        },
        {
          filename: 'image03.jpg',
        },
      ],
    });

    expect(post).toHaveProperty('id');
    expect(post.title).toBe('Macbookpro');
    expect(post.description).toBe(
      'Desta maneira, a valorização de fatores subjetivos facilita a criação do fluxo de informações.',
    );
  });

  it('should not be able to create a new post from non-existing user', async () => {
    await expect(
      createPost.execute({
        user_id: 'non-existing',
        title: 'Macbookpro',
        description: 'Muito bom',
        category: 'Tecnologia',
        images: [
          {
            filename: 'image01.jpg',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new post without title', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      createPost.execute({
        user_id: user.id,
        title: '',
        description: 'Muito bom',
        category: 'Tecnologia',
        images: [
          {
            filename: 'image01.jpg',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to set post category_id by category title', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const category = await fakeCategoryRepository.create({
      title: 'Tecnologia',
    });

    const post = await createPost.execute({
      user_id: user.id,
      title: 'Macbookpro',
      description:
        'Desta maneira, a valorização de fatores subjetivos facilita a criação do fluxo de informações.',
      category: 'Tecnologia',
      images: [
        {
          filename: 'image01.jpg',
        },
        {
          filename: 'image02.jpg',
        },
        {
          filename: 'image03.jpg',
        },
      ],
    });

    expect(post.category_id).toBe(category.id);
  });

  it('should be able to create a new category if non-existing', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const post = await createPost.execute({
      user_id: user.id,
      title: 'Macbookpro',
      description:
        'Desta maneira, a valorização de fatores subjetivos facilita a criação do fluxo de informações.',
      category: 'Tecnologia',
      images: [
        {
          filename: 'image01.jpg',
        },
        {
          filename: 'image02.jpg',
        },
        {
          filename: 'image03.jpg',
        },
      ],
    });

    expect(post.category_id).not.toBe(null);
  });

  it('should not be able to create a new post without images', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      createPost.execute({
        user_id: user.id,
        title: 'Macbookpro',
        description: 'Muito bom',
        category: 'Tecnologia',
        images: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

it('should be able to create a new post without category', async () => {
  const user = await fakeUsersRepository.create({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
  });

  const post = await createPost.execute({
    user_id: user.id,
    title: 'Macbookpro',
    description:
      'Desta maneira, a valorização de fatores subjetivos facilita a criação do fluxo de informações.',
    images: [
      {
        filename: 'image01.jpg',
      },
    ],
  });

  expect(post.category_id).toBe(null);
});
