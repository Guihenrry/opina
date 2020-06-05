import ListPostsService from './ListPostsService';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';

import FakeCategoryRepository from '../repositories/fakes/FakeCategoryRepository';

let fakePostsRepository: FakePostsRepository;
let fakeCategoryRepository: FakeCategoryRepository;
let listPosts: ListPostsService;

describe('ListPosts', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeCategoryRepository = new FakeCategoryRepository();
    listPosts = new ListPostsService(
      fakePostsRepository,
      fakeCategoryRepository,
    );
  });

  it('Should be able to list posts', async () => {
    const post1 = await fakePostsRepository.create({
      title: 'Macbook',
      description: 'Notebook Apple.',
      category_id: '1-2-3',
      user_id: 'user-id',
      images: [],
    });

    const post2 = await fakePostsRepository.create({
      title: 'Macbook',
      description: 'Notebook Apple.',
      category_id: '1-2-3',
      user_id: 'user-id',
      images: [],
    });

    await fakePostsRepository.create({
      title: 'Macbook',
      description: 'Notebook Apple.',
      category_id: '1-2-3',
      user_id: 'user-id',
      images: [],
    });

    const response = await listPosts.execute({
      per_page: 2,
      page: 1,
    });

    expect(response.posts).toEqual([post1, post2]);
    expect(response.total).toBe(3);
  });

  it('should be able to filter list post with category title', async () => {
    const category = await fakeCategoryRepository.create({
      title: 'Tecnologia',
    });

    const post1 = await fakePostsRepository.create({
      title: 'Macbook',
      description: 'Notebook Apple.',
      category_id: category.id,
      user_id: 'user-id',
      images: [],
    });

    await fakePostsRepository.create({
      title: 'Macbook',
      description: 'Notebook Apple.',
      category_id: 'no-category',
      user_id: 'user-id',
      images: [],
    });

    await fakePostsRepository.create({
      title: 'Macbook',
      description: 'Notebook Apple.',
      category_id: 'no-category',
      user_id: 'user-id',
      images: [],
    });

    const response = await listPosts.execute({
      per_page: 3,
      page: 1,
      category: 'Tecnologia',
    });

    expect(response.posts).toEqual([post1]);
    expect(response.total).toBe(1);
  });

  it('Should be able to filter posts by title', async () => {
    const post1 = await fakePostsRepository.create({
      title: 'Macbook',
      description: 'Notebook Apple.',
      category_id: '1-2-3',
      user_id: 'user-id',
      images: [],
    });

    await fakePostsRepository.create({
      title: 'Other Title',
      description: 'Notebook Apple.',
      category_id: '1-2-3',
      user_id: 'user-id',
      images: [],
    });

    const response = await listPosts.execute({
      per_page: 2,
      page: 1,
      title: 'Macbook',
    });

    expect(response.posts).toEqual([post1]);
    expect(response.total).toBe(1);
  });
});
