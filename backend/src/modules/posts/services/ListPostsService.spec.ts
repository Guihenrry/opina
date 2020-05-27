import ListPostsService from './ListPostsService';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';

let fakePostsRepository: FakePostsRepository;
let listPosts: ListPostsService;

describe('ListPosts', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    listPosts = new ListPostsService(fakePostsRepository);
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

    const posts = await listPosts.execute({
      per_page: 2,
      page: 1,
    });

    expect(posts).toEqual([post1, post2]);
  });

  it('should be able to filter list post with category id', async () => {
    const post1 = await fakePostsRepository.create({
      title: 'Macbook',
      description: 'Notebook Apple.',
      category_id: 'Tecnologia',
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

    const posts = await listPosts.execute({
      per_page: 3,
      page: 1,
      category_id: 'Tecnologia',
    });

    expect(posts).toEqual([post1]);
  });
});
