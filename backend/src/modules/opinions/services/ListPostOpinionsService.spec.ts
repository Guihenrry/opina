import FakePostsRepository from '@modules/posts/repositories/fakes/FakePostsRepository';
import AppError from '@shared/errors/AppError';
import ListPostOpinionsService from './ListPostOpinionsService';
import FakeOpinionsRepository from '../repositories/fakes/FakeOpinionsRepository';

let fakeOpinionsRepository: FakeOpinionsRepository;
let fakePostsRepository: FakePostsRepository;
let listPostOpinions: ListPostOpinionsService;

describe('ListPostOpinions', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeOpinionsRepository = new FakeOpinionsRepository();
    listPostOpinions = new ListPostOpinionsService(
      fakePostsRepository,
      fakeOpinionsRepository,
    );
  });

  it('Should be able to list opinions by post id', async () => {
    const post = await fakePostsRepository.create({
      title: 'Notebook',
      description: 'Description',
      category_id: 'Tec',
      images: [
        {
          filename: 'image.jpg',
        },
      ],
      user_id: 'user-post',
    });

    const opinion1 = await fakeOpinionsRepository.create({
      post_id: post.id,
      text: 'opinion1',
      user_id: 'user-opinion-1',
    });

    const opinion2 = await fakeOpinionsRepository.create({
      post_id: post.id,
      text: 'opinion2',
      user_id: 'user-opinion-2',
    });

    await fakeOpinionsRepository.create({
      post_id: 'otherPost',
      text: 'otherOpinion',
      user_id: 'user-opinion-2',
    });

    const opinions = await listPostOpinions.execute({
      post_id: post.id,
    });

    expect(opinions).toEqual([opinion1, opinion2]);
  });

  it('Should not be able to list opinions by post id if post non-existing', async () => {
    await expect(
      listPostOpinions.execute({
        post_id: 'non-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
