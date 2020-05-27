import AppError from '@shared/errors/AppError';
import DeleteOpinionService from './DeleteOpinionService';
import FakeOpinionsRepository from '../repositories/fakes/FakeOpinionsRepository';

let fakeOpinionsRepository: FakeOpinionsRepository;
let deleteOpinion: DeleteOpinionService;

describe('DeleteOpinion', () => {
  beforeEach(() => {
    fakeOpinionsRepository = new FakeOpinionsRepository();

    deleteOpinion = new DeleteOpinionService(fakeOpinionsRepository);
  });

  it('should be able to delete opinion', async () => {
    const deleteById = jest.spyOn(fakeOpinionsRepository, 'deleteById');

    const opinion = await fakeOpinionsRepository.create({
      post_id: 'post-id',
      user_id: 'user-id',
      text: 'text',
    });

    await deleteOpinion.execute({
      user_id: 'user-id',
      opinion_id: opinion.id,
    });

    expect(deleteById).toHaveBeenCalledWith(opinion.id);
  });

  it('should not be able to delete opinion if non-existing', async () => {
    await expect(
      deleteOpinion.execute({
        user_id: 'user-id',
        opinion_id: 'non-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete opinion if not user', async () => {
    const opinion = await fakeOpinionsRepository.create({
      post_id: 'post-id',
      user_id: 'user-id',
      text: 'text',
    });

    await expect(
      deleteOpinion.execute({
        user_id: 'non-existing-user',
        opinion_id: opinion.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
