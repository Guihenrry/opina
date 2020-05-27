import AppError from '@shared/errors/AppError';
import UpdateOpinionService from './UpdateOpinionService';
import FakeOpinionsRepository from '../repositories/fakes/FakeOpinionsRepository';

let fakeOpinionsRepository: FakeOpinionsRepository;
let updateOpinion: UpdateOpinionService;

describe('UpdateOpinion', () => {
  beforeEach(() => {
    fakeOpinionsRepository = new FakeOpinionsRepository();

    updateOpinion = new UpdateOpinionService(fakeOpinionsRepository);
  });

  it('should be able to update opinion', async () => {
    const opinion = await fakeOpinionsRepository.create({
      post_id: 'post-id',
      user_id: 'user-id',
      text: 'text',
    });

    const updatedOpinion = await updateOpinion.execute({
      user_id: 'user-id',
      opinion_id: opinion.id,
      text: 'new-text',
    });

    expect(updatedOpinion.text).toBe('new-text');
  });

  it('should not be able to update opinion if non-existing', async () => {
    await expect(
      updateOpinion.execute({
        user_id: 'user-id',
        opinion_id: 'non-existing',
        text: 'new-text',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update opinion if not user', async () => {
    const opinion = await fakeOpinionsRepository.create({
      post_id: 'post-id',
      user_id: 'user-id',
      text: 'text',
    });

    await expect(
      updateOpinion.execute({
        user_id: 'non-existing-user',
        opinion_id: opinion.id,
        text: 'new-text',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
