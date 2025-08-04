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
  
  afterEach(() => {
    jest.clearAllMocks();
  });
});
