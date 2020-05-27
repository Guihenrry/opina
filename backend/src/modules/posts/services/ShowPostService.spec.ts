import AppError from '@shared/errors/AppError';
import ShowPostService from './ShowPostService';
import FakePostsRepository from '../repositories/fakes/FakePostsRepository';

let fakePostsRepository: FakePostsRepository;
let showPost: ShowPostService;

describe('ShowPost', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    showPost = new ShowPostService(fakePostsRepository);
  });

  it('Should be able to show post', async () => {
    const post = await fakePostsRepository.create({
      title: 'Macbook',
      description: 'Muito bom',
      category_id: 'category',
      images: [],
      user_id: 'user_id',
    });

    const findPost = await showPost.execute({
      id: post.id,
    });

    expect(findPost.title).toBe('Macbook');
    expect(findPost.description).toBe('Muito bom');
  });

  it('Should not be able to show post if non-existing', async () => {
    await expect(
      showPost.execute({
        id: 'non-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
