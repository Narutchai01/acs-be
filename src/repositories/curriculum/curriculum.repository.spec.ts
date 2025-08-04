import { Test, TestingModule } from '@nestjs/testing';
import { ICurriculumRepository } from './curriculum.abstract';

describe('CreateCurriculum', () => {
  let repo: ICurriculumRepository;

  const MockRepo = {
    create: jest.fn(),
    getList: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ICurriculumRepository,
          useValue: MockRepo,
        },
      ],
    }).compile();

    repo = module.get<ICurriculumRepository>(ICurriculumRepository);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('Create Curriculum success', async () => {
    const curriculumData = {
      id: 0,
      year: '2024',
      fileUrl: 'https://example.com/curriculum.pdf',
      imageUrl: 'https://example.com/curriculum-image.jpg',
      description: 'This is a test curriculum description.',
      createdDate: '2024-01-01T00:00:00.000Z',
      updatedDate: '2024-01-01T00:00:00.000Z',
      deletedDate: null,
      createdBy: 0,
      updatedBy: 0,
      courses: ['Mathematics', 'Science'],
    };

    await repo.create(curriculumData);
    expect(MockRepo.create).toHaveBeenCalledWith(curriculumData);
  });

  it('should throw an error if create fails', async () => {
    const curriculumData = {
      id: 0,
      year: '2024',
      fileUrl: 'https://example.com/curriculum.pdf',
      imageUrl: 'https://example.com/curriculum-image.jpg',
      description: 'This is a test curriculum description.',
      createdDate: '2024-01-01T00:00:00.000Z',
      updatedDate: '2024-01-01T00:00:00.000Z',
      deletedDate: null,
      createdBy: 0,
      updatedBy: 0,
      courses: ['Mathematics', 'Science'],
    };

    MockRepo.create.mockRejectedValue(new Error('Create failed'));

    await expect(repo.create(curriculumData)).rejects.toThrow('Create failed');
  });

  it('Get List of Curriculums success', async () => {
    const curriculumList = [
      {
        id: 1,
        year: '2024',
        fileUrl: 'https://example.com/curriculum1.pdf',
        imageUrl: 'https://example.com/curriculum1-image.jpg',
        description: 'Curriculum 1 description.',
        createdDate: '2024-01-01T00:00:00.000Z',
        updatedDate: '2024-01-01T00:00:00.000Z',
        deletedDate: null,
        createdBy: 1,
        updatedBy: 1,
        courses: [],
      },
    ];

    MockRepo.getList.mockResolvedValue(curriculumList);

    const result = await repo.getList();
    expect(result).toEqual(curriculumList);
    expect(MockRepo.getList).toHaveBeenCalled();
  });

  it('should throw an error if getList fails', async () => {
    MockRepo.getList.mockRejectedValue(new Error('Database error'));

    await expect(repo.getList()).rejects.toThrow('Database error');
  });

  it('Get Curriculum by ID success', async () => {
    const curriculumId = 1;
    const curriculumData = {
      id: curriculumId,
      year: '2024',
      fileUrl: 'https://example.com/curriculum.pdf',
      imageUrl: 'https://example.com/curriculum-image.jpg',
      description: 'This is a test curriculum description.',
      createdDate: '2024-01-01T00:00:00.000Z',
      updatedDate: '2024-01-01T00:00:00.000Z',
      deletedDate: null,
      createdBy: 1,
      updatedBy: 1,
      courses: [],
    };

    MockRepo.getById.mockResolvedValue(curriculumData);

    const result = await repo.getById(curriculumId);
    expect(result).toEqual(curriculumData);
    expect(MockRepo.getById).toHaveBeenCalledWith(curriculumId);
  });

  it('should throw an error if getById fails', async () => {
    const curriculumId = 1;
    MockRepo.getById.mockRejectedValue(new Error('Curriculum not found'));

    await expect(repo.getById(curriculumId)).rejects.toThrow(
      'Curriculum not found',
    );
  });

  it('Update Curriculum success', async () => {
    const curriculumId = 1;
    const updateData = {
      year: '2025',
      fileUrl: 'https://example.com/curriculum-updated.pdf',
      imageUrl: 'https://example.com/curriculum-updated-image.jpg',
      description: 'Updated curriculum description.',
      updatedBy: 1,
    };

    const updatedCurriculum = {
      id: curriculumId,
      ...updateData,
      createdDate: '2024-01-01T00:00:00.000Z',
      updatedDate: '2024-01-02T00:00:00.000Z',
      deletedDate: null,
      createdBy: 1,
      courses: [],
    };

    MockRepo.update.mockResolvedValue(updatedCurriculum);

    const result = await repo.update(curriculumId, updateData);
    expect(result).toEqual(updatedCurriculum);
    expect(MockRepo.update).toHaveBeenCalledWith(curriculumId, updateData);
  });

  it('should throw an error if update fails', async () => {
    const curriculumId = 1;
    const updateData = {
      year: '2025',
      fileUrl: 'https://example.com/curriculum-updated.pdf',
      imageUrl: 'https://example.com/curriculum-updated-image.jpg',
      description: 'Updated curriculum description.',
      updatedBy: 1,
    };

    MockRepo.update.mockRejectedValue(new Error('Update failed'));

    await expect(repo.update(curriculumId, updateData)).rejects.toThrow(
      'Update failed',
    );
  });

  it('Delete Curriculum success', async () => {
    const curriculumId = 1;
    const updatedBy = 1;

    const deletedCurriculum = {
      id: curriculumId,
      year: '2024',
      fileUrl: 'https://example.com/curriculum.pdf',
      imageUrl: 'https://example.com/curriculum-image.jpg',
      description: 'This is a test curriculum description.',
      createdDate: '2024-01-01T00:00:00.000Z',
      updatedDate: '2024-01-01T00:00:00.000Z',
      deletedDate: new Date(),
      createdBy: 1,
      updatedBy,
      courses: [],
    };

    MockRepo.delete.mockResolvedValue(deletedCurriculum);

    const result = await repo.delete(curriculumId, updatedBy);
    expect(result).toEqual(deletedCurriculum);
    expect(MockRepo.delete).toHaveBeenCalledWith(curriculumId, updatedBy);
  });

  it('should throw an error if delete fails', async () => {
    const curriculumId = 1;
    const updatedBy = 1;

    MockRepo.delete.mockRejectedValue(new Error('Delete failed'));

    await expect(repo.delete(curriculumId, updatedBy)).rejects.toThrow(
      'Delete failed',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
