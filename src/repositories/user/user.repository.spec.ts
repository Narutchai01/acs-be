import { Test, TestingModule } from '@nestjs/testing';
import { IUserRepository } from './user.abstract';

describe('CreateUser', () => {
  let repo: IUserRepository;

  const MockRepo = {
    createUser: jest.fn(),
    getUserEmail: jest.fn(),
    getUserById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: IUserRepository,
          useValue: MockRepo,
        },
      ],
    }).compile();

    repo = module.get<IUserRepository>(IUserRepository);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('Create User success', async () => {
    const userData = {
      firstNameTh: 'สมชาย',
      lastNameTh: 'ใจดี',
      firstNameEn: 'Somchai',
      lastNameEn: 'Jaidee',
      email: 'somchai@example.com',
      nickName: 'chai',
      imageUrl: 'test-image.jpg',
      password: 'TestPassword123',
      createdDate: new Date(),
      updatedDate: new Date(),
      deletedDate: null,
      createdBy: 1,
      updatedBy: 1,
    };

    await repo.createUser(userData);
    expect(MockRepo.createUser).toHaveBeenCalledWith(userData);
  });

  it('should throw an error if createUser fails', async () => {
    const userData = {
      firstNameTh: 'สมชาย',
      lastNameTh: 'ใจดี',
      firstNameEn: 'Somchai',
      lastNameEn: 'Jaidee',
      email: 'somchai@example.com',
      nickName: 'chai',
      imageUrl: 'test-image.jpg',
      password: 'TestPassword123',
      createdDate: new Date(),
      updatedDate: new Date(),
      deletedDate: null,
      createdBy: 1,
      updatedBy: 1,
    };

    MockRepo.createUser.mockRejectedValue(new Error('Database error'));

    await expect(repo.createUser(userData)).rejects.toThrow('Database error');
  });

  it('Get User by Email success', async () => {
    const email = 'somchai@example.com';
    const userData = {
      id: 1,
      firstNameTh: 'สมชาย',
      lastNameTh: 'ใจดี',
      firstNameEn: 'Somchai',
      lastNameEn: 'Jaidee',
      email: email,
      nickName: 'chai',
      imageUrl: 'test-image.jpg',
      password: 'TestPassword123',
      createdDate: new Date(),
      updatedDate: new Date(),
      deletedDate: null,
      createdBy: 1,
      updatedBy: 1,
    };

    MockRepo.getUserEmail.mockResolvedValue(userData);

    const result = await repo.getUserEmail(email);
    expect(result).toEqual(userData);
    expect(MockRepo.getUserEmail).toHaveBeenCalledWith(email);
  });

  it('should throw an error if getUserEmail fails', async () => {
    const email = 'somchai@example.com';

    MockRepo.getUserEmail.mockRejectedValue(new Error('Database error'));

    await expect(repo.getUserEmail(email)).rejects.toThrow('Database error');
  });

  it('should throw an error if getUserEmail is called with invalid email', async () => {
    const invalidEmail = '';
    MockRepo.getUserEmail.mockRejectedValueOnce(new Error('Invalid email'));
    await expect(repo.getUserEmail(invalidEmail)).rejects.toThrow(
      'Invalid email',
    );
  });

  it('Get User by ID success', async () => {
    const userId = 1;
    const userData = {
      id: userId,
      firstNameTh: 'สมชาย',
      lastNameTh: 'ใจดี',
      firstNameEn: 'Somchai',
      lastNameEn: 'Jaidee',
      email: 'somchai@example.com',
      nickName: 'chai',
      imageUrl: 'test-image.jpg',
      password: 'TestPassword123',
      createdDate: new Date(),
      updatedDate: new Date(),
      deletedDate: null,
      createdBy: 1,
      updatedBy: 1,
    };

    MockRepo.getUserById.mockResolvedValue(userData);

    const result = await repo.getUserById(userId);
    expect(result).toEqual(userData);
    expect(MockRepo.getUserById).toHaveBeenCalledWith(userId);
  });

  it('should throw an error if getUserById fails', async () => {
    const userId = 1;
    MockRepo.getUserById.mockRejectedValue(new Error('Database error'));
    await expect(repo.getUserById(userId)).rejects.toThrow('Database error');
  });

  it('should throw an error if getUserById is called with an invalid ID', async () => {
    const userId = -1;
    MockRepo.getUserById.mockRejectedValueOnce(new Error('Invalid user ID'));
    await expect(repo.getUserById(userId)).rejects.toThrow('Invalid user ID');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
