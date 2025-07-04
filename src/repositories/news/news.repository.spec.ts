import { Test, TestingModule } from '@nestjs/testing';
import { INewsRepository } from './news.abstract';

describe('CreateNews', () => {
  let repo: INewsRepository;

  const MockRepo = {
    createNews: jest.fn(),
    getNews: jest.fn(),
    getNewsById: jest.fn(),
    updateNews: jest.fn(),
    deleteNews: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: INewsRepository,
          useValue: MockRepo,
        },
      ],
    }).compile();

    repo = module.get<INewsRepository>(INewsRepository);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('Create News success', async () => {
    const newsData = {
      title: 'Test News',
      image: 'test-image.jpg',
      detail: 'This is a test news detail.',
      categoryId: 1,
      startDate: new Date(),
      dueDate: null,
      createdBy: 1,
      updatedBy: 1,
      createdDate: new Date(),
      updatedDate: new Date(),
    };

    await repo.createNews(newsData);
    expect(MockRepo.createNews).toHaveBeenCalledWith(newsData);
  });

  it('should throw an error if createNews fails', async () => {
    const newsData = {
      title: 'Test News',
      image: 'test-image.jpg',
      detail: 'This is a test news detail.',
      categoryId: 1,
      startDate: new Date(),
      dueDate: null,
      createdBy: 1,
      updatedBy: 1,
      createdDate: new Date(),
      updatedDate: new Date(),
    };

    MockRepo.createNews.mockRejectedValue(new Error('Database error'));

    await expect(repo.createNews(newsData)).rejects.toThrow('Database error');
  });

  it('Get News success', async () => {
    const newsId = 1;
    const newsData = {
      id: newsId,
      title: 'Test News',
      image: 'test-image.jpg',
      detail: 'This is a test news detail.',
      categoryId: 1,
      startDate: new Date(),
      dueDate: null,
      createdBy: 1,
      updatedBy: 1,
      createdDate: new Date(),
      updatedDate: new Date(),
    };

    MockRepo.getNews.mockResolvedValue(newsData);

    const result = await repo.getNews({
      page: 1,
      pageSize: 10,
      category: 'all',
    });
    expect(result).toEqual(newsData);
    expect(MockRepo.getNews).toHaveBeenCalledWith({
      page: 1,
      pageSize: 10,
      category: 'all',
    });
  });

  it('should throw an error if getNews fails', async () => {
    MockRepo.getNews.mockRejectedValue(new Error('Database error'));

    await expect(
      repo.getNews({ page: 1, pageSize: 10, category: 'all' }),
    ).rejects.toThrow('Database error');
  });

  it('Get News by ID success', async () => {
    const newsId = 1;
    const newsData = {
      id: newsId,
      title: 'Test News',
      image: 'test-image.jpg',
      detail: 'This is a test news detail.',
      categoryId: 1,
      startDate: new Date(),
      dueDate: null,
      createdBy: 1,
      updatedBy: 1,
      createdDate: new Date(),
      updatedDate: new Date(),
    };

    MockRepo.getNewsById.mockResolvedValue(newsData);

    const result = await repo.getNewsById(newsId);
    expect(result).toEqual(newsData);
    expect(MockRepo.getNewsById).toHaveBeenCalledWith(newsId);
  });

  it('should throw an error if getNewsById fails', async () => {
    const newsId = 1;
    MockRepo.getNewsById.mockRejectedValue(new Error('Database error'));

    await expect(repo.getNewsById(newsId)).rejects.toThrow('Database error');
  });

  it('should throw an error if getNewsById is called with an invalid ID', async () => {
    const newsId = -1;
    MockRepo.getNewsById.mockRejectedValueOnce(new Error('Invalid news ID'));
    await expect(repo.getNewsById(newsId)).rejects.toThrow('Invalid news ID');
  });

  it('Update News success', async () => {
    const newsId = 1;
    const updateData = {
      title: 'Updated News',
      image: 'updated-image.jpg',
      detail: 'This is an updated news detail.',
      categoryId: 2,
      startDate: new Date(),
      dueDate: null,
      updatedBy: 1,
      updatedDate: new Date(),
    };

    MockRepo.updateNews.mockResolvedValue({
      id: newsId,
      ...updateData,
    });

    const result = await repo.updateNews(newsId, updateData);
    expect(result).toEqual({
      id: newsId,
      ...updateData,
    });
    expect(MockRepo.updateNews).toHaveBeenCalledWith(newsId, updateData);
  });

  it('should throw an error if updateNews fails', async () => {
    const newsId = 1;
    const updateData = {
      title: 'Updated News',
      image: 'updated-image.jpg',
      detail: 'This is an updated news detail.',
      categoryId: 2,
      startDate: new Date(),
      dueDate: null,
      updatedBy: 1,
      updatedDate: new Date(),
    };

    MockRepo.updateNews.mockRejectedValue(new Error('Database error'));

    await expect(repo.updateNews(newsId, updateData)).rejects.toThrow(
      'Database error',
    );
  });

  it('should throw an error if updateNews is called with an invalid ID', async () => {
    const newsId = -1;
    const updateData = {
      title: 'Updated News',
      image: 'updated-image.jpg',
      detail: 'This is an updated news detail.',
      categoryId: 2,
      startDate: new Date(),
      dueDate: null,
      updatedBy: 1,
      updatedDate: new Date(),
    };

    MockRepo.updateNews.mockRejectedValueOnce(new Error('Invalid news ID'));
    await expect(repo.updateNews(newsId, updateData)).rejects.toThrow(
      'Invalid news ID',
    );
  });

  it('Delete News success', async () => {
    const newsId = 1;

    MockRepo.deleteNews.mockResolvedValue(true);

    const result = await repo.deleteNews(newsId, 1);
    expect(result).toBe(true);
    expect(MockRepo.deleteNews).toHaveBeenCalledWith(newsId, 1);
  });

  it('should throw an error if deleteNews fails', async () => {
    const newsId = 1;
    MockRepo.deleteNews.mockRejectedValue(new Error('Database error'));

    await expect(repo.deleteNews(newsId, 1)).rejects.toThrow('Database error');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
