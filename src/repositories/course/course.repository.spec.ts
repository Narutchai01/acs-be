import { Test, TestingModule } from '@nestjs/testing';
import { ICourseRepository } from './course.abstract';

describe('CreateCourse', () => {
  let repo: ICourseRepository;

  const MockRepo = {
    getCourse: jest.fn(),
    getCourseById: jest.fn(),
    createCourse: jest.fn(),
    updateCourse: jest.fn(),
    deleteCourse: jest.fn(),
    count: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ICourseRepository,
          useValue: MockRepo,
        },
      ],
    }).compile();

    repo = module.get<ICourseRepository>(ICourseRepository);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('Get Course success', async () => {
    const courseData = [
      {
        id: 4,
        courseId: 'deserunt minim consectetur cillum commodo',
        courseNameTh: 'Alicia Howe',
        courseNameEn: 'Wayne Vandervort',
        credits: 'nisi dolor',
        courseDetail: 'ut officia',
        createdDate: new Date(),
        updatedDate: new Date(),
        deletedDate: null,
        createdBy: 1,
        updatedBy: 1,
        curriculum: {
          id: 1,
          year: '2025',
          fileUrl: 'dasd',
          createdBy: 1,
          updatedBy: 1,
          createdDat: new Date(),
          updatedDate: new Date(),
        },
        typeCourse: {
          id: 1,
          name: 'กลุ่มวิชาเฉพาะประเภทวิชาแกน',
          description: 'Learn the fundamentals of computer science.',
        },
        preCourses: [],
      },
      {
        id: 5,
        courseId: 'deserunt minim consectetur cillum commodo',
        courseNameTh: 'Alicia Howe',
        courseNameEn: 'Wayne Vandervort',
        credits: 'nisi dolor',
        courseDetail: 'ut officia',
        createdDate: new Date(),
        updatedDate: new Date(),
        deletedDate: null,
        createdBy: 1,
        updatedBy: 1,
        curriculum: {
          id: 1,
          year: '2025',
          fileUrl: 'dasd',
          createdBy: 1,
          updatedBy: 1,
          createdDate: new Date(),
          updatedDate: new Date(),
        },
        typeCourse: {
          id: 1,
          name: 'กลุ่มวิชาเฉพาะประเภทวิชาแกน',
          description: 'Learn the fundamentals of computer science.',
        },
        preCourses: [],
      },
      {
        id: 6,
        courseId: 'deserunt minim consectetur cillum commodo',
        courseNameTh: 'Alicia Howe',
        courseNameEn: 'Wayne Vandervort',
        credits: 'nisi dolor',
        courseDetail: 'ut officia',
        createdDate: new Date(),
        updatedDate: new Date(),
        deletedDate: null,
        createdBy: 1,
        updatedBy: 1,
        curriculum: {
          id: 1,
          year: '2025',
          fileUrl: 'dasd',
          createdBy: 1,
          updatedBy: 1,
          createdDate: new Date(),
          updatedDate: new Date(),
        },
        typeCourse: {
          id: 1,
          name: 'กลุ่มวิชาเฉพาะประเภทวิชาแกน',
          description: 'Learn the fundamentals of computer science.',
        },
        preCourses: [],
      },
      {
        id: 7,
        courseId: 'deserunt minim consectetur cillum commodo',
        courseNameTh: 'Alicia Howe',
        courseNameEn: 'Wayne Vandervort',
        credits: 'nisi dolor',
        courseDetail: 'ut officia',
        createdDate: new Date(),
        updatedDate: new Date(),
        deletedDate: null,
        createdBy: 1,
        updatedBy: 1,
        curriculum: {
          id: 1,
          year: '2025',
          fileUrl: 'dasd',
          createdBy: 1,
          updatedBy: 1,
          createdDate: new Date(),
          updatedDate: new Date(),
        },
        typeCourse: {
          id: 1,
          name: 'กลุ่มวิชาเฉพาะประเภทวิชาแกน',
          description: 'Learn the fundamentals of computer science.',
        },
        preCourses: [],
      },
      {
        id: 8,
        courseId: 'deserunt minim consectetur cillum commodo',
        courseNameTh: 'Alicia Howe',
        courseNameEn: 'Wayne Vandervort',
        credits: 'nisi dolor',
        courseDetail: 'ut officia',
        createdDate: new Date(),
        updatedDate: new Date(),
        deletedDate: null,
        createdBy: 1,
        updatedBy: 1,
        curriculum: {
          id: 1,
          year: '2025',
          fileUrl: 'dasd',
          createdBy: 1,
          updatedBy: 1,
          createdDate: new Date(),
          updatedDate: new Date(),
        },
        typeCourse: {
          id: 2,
          name: 'กลุ่มวิชาเฉพาะประเภทวิชาเฉพาะด้าน',
          description: 'Explore advanced mathematical concepts.',
        },
        preCourses: [
          {
            id: 4,
            courseId: 'deserunt minim consectetur cillum commodo',
            courseNameTh: 'Alicia Howe',
            courseNameEn: 'Wayne Vandervort',
            credits: 'nisi dolor',
            courseDetail: 'ut officia',
            createdDate: new Date(),
            updatedDate: new Date(),
            deletedDate: null,
            createdBy: 1,
            updatedBy: 1,
            curriculum: null,
            typeCourses: null,
            preCourses: [],
          },
          {
            id: 5,
            courseId: 'deserunt minim consectetur cillum commodo',
            courseNameTh: 'Alicia Howe',
            courseNameEn: 'Wayne Vandervort',
            credits: 'nisi dolor',
            courseDetail: 'ut officia',
            createdDate: new Date(),
            updatedDate: new Date(),
            deletedDate: null,
            createdBy: 1,
            updatedBy: 1,
            curriculum: null,
            typeCourses: null,
            preCourses: [],
          },
          {
            id: 6,
            courseId: 'deserunt minim consectetur cillum commodo',
            courseNameTh: 'Alicia Howe',
            courseNameEn: 'Wayne Vandervort',
            credits: 'nisi dolor',
            courseDetail: 'ut officia',
            createdDate: new Date(),
            updatedDate: new Date(),
            deletedDate: null,
            createdBy: 1,
            updatedBy: 1,
            curriculum: null,
            typeCourses: null,
            preCourses: [],
          },
        ],
      },
    ];

    MockRepo.getCourse.mockResolvedValue(courseData);

    const result = await repo.getCourse({
      page: 1,
      pageSize: 10,
      curriculumId: 1,
      typecourseId: 1,
    });
    expect(result).toEqual(courseData);
    expect(MockRepo.getCourse).toHaveBeenCalledWith({
      page: 1,
      pageSize: 10,
      curriculumId: 1,
      typecourseId: 1,

      // searchByTypeCourse: 'กลุ่มวิชาเฉพาะประเภทวิชาแกน',
    });
  });

  it('should throw an error if getCourse fails', async () => {
    MockRepo.getCourse.mockRejectedValue(new Error('Database error'));

    await expect(
      repo.getCourse({
        page: 1,
        pageSize: 10,
        curriculumId: 1,
        typecourseId: 1,
      }),
    ).rejects.toThrow('Database error');
  });

  it('Get Course by ID success', async () => {
    const courseId = 8;
    const courseData = {
      id: courseId,
      courseId: 'deserunt minim consectetur cillum commodo',
      courseNameTh: 'Alicia Howe',
      courseNameEn: 'Wayne Vandervort',
      credits: 'nisi dolor',
      courseDetail: 'ut officia',
      createdDate: new Date(),
      updatedDate: new Date(),
      deletedDate: null,
      createdBy: 1,
      updatedBy: 1,
      curriculum: {
        id: 1,
        year: '2025',
        fileUrl: 'dasd',
        createdBy: 1,
        updatedBy: 1,
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      typeCourse: {
        id: 2,
        name: 'กลุ่มวิชาเฉพาะประเภทวิชาเฉพาะด้าน',
        description: 'Explore advanced mathematical concepts.',
      },
      preCourses: [
        {
          id: 4,
          courseId: 'deserunt minim consectetur cillum commodo',
          courseNameTh: 'Alicia Howe',
          courseNameEn: 'Wayne Vandervort',
          credits: 'nisi dolor',
          courseDetail: 'ut officia',
          createdDate: new Date(),
          updatedDate: new Date(),
          deletedDate: null,
          createdBy: 1,
          updatedBy: 1,
          curriculum: null,
          typeCourses: null,
          preCourses: [],
        },
        {
          id: 5,
          courseId: 'deserunt minim consectetur cillum commodo',
          courseNameTh: 'Alicia Howe',
          courseNameEn: 'Wayne Vandervort',
          credits: 'nisi dolor',
          courseDetail: 'ut officia',
          createdDate: new Date(),
          updatedDate: new Date(),
          deletedDate: null,
          createdBy: 1,
          updatedBy: 1,
          curriculum: null,
          typeCourses: null,
          preCourses: [],
        },
        {
          id: 6,
          courseId: 'deserunt minim consectetur cillum commodo',
          courseNameTh: 'Alicia Howe',
          courseNameEn: 'Wayne Vandervort',
          credits: 'nisi dolor',
          courseDetail: 'ut officia',
          createdDate: new Date(),
          updatedDate: new Date(),
          deletedDate: null,
          createdBy: 1,
          updatedBy: 1,
          curriculum: null,
          typeCourses: null,
          preCourses: [],
        },
      ],
    };

    MockRepo.getCourseById.mockResolvedValue(courseData);

    const result = await repo.getCourseById(courseId);
    expect(result).toEqual(courseData);
    expect(MockRepo.getCourseById).toHaveBeenCalledWith(courseId);
  });

  it('should throw an error if getCourseById fails', async () => {
    const courseId = 1;
    MockRepo.getCourseById.mockRejectedValue(new Error('Database error'));

    await expect(repo.getCourseById(courseId)).rejects.toThrow(
      'Database error',
    );
  });

  it('should throw an error if getCourseById is called with an invalid ID', async () => {
    const courseId = -1;
    MockRepo.getCourseById.mockRejectedValueOnce(
      new Error('Invalid course ID'),
    );
    await expect(repo.getCourseById(courseId)).rejects.toThrow(
      'Invalid course ID',
    );
  });

  it('create Course success', async () => {
    const courseData = {
      courseId: 'create test courseId',
      credits: '3',
      curriculumId: 1,
      typeCourseId: 1,
      courseNameTh: 'create test courseNameTh',
      courseNameEn: 'create test courseNameTh',
      courseDetail: 'create test courseDetail',
      createdDate: new Date(),
      updatedDate: new Date(),
      deletedDate: null,
      createdBy: 1,
      updatedBy: 1,
      PrevCourse: [4, 5],
    };

    await repo.createCourse(courseData);
    expect(MockRepo.createCourse).toHaveBeenCalledWith(courseData);
  });

  it('should throw an error if createCourse fails', async () => {
    const courseData = {
      courseId: 'create test courseId',
      credits: '3',
      curriculumId: 1,
      typeCourseId: 1,
      courseNameTh: 'create test courseNameTh',
      courseNameEn: 'create test courseNameTh',
      courseDetail: 'create test courseDetail',
      createdDate: new Date(),
      updatedDate: new Date(),
      deletedDate: null,
      createdBy: 1,
      updatedBy: 1,
      PrevCourse: [1, 2, 3],
    };

    MockRepo.createCourse.mockRejectedValue(new Error('Database error'));
    await expect(repo.createCourse(courseData)).rejects.toThrow(
      'Database error',
    );
  });

  it('update Course success', async () => {
    const courseId = 1;
    const updateData = {
      courseId: 'update courseId',
      credits: '4',
      curriculumId: 2,
      typeCourseId: 2,
      courseNameTh: 'update courseNameTh',
      courseNameEn: 'update courseNameEn',
      courseDetail: 'update courseDetail',
      updatedDate: new Date(),
      deletedDate: null,
      updatedBy: 1,
      PrevCourse: [4, 5, 6],
    };

    MockRepo.updateCourse.mockResolvedValue({
      id: courseId,
      ...updateData,
    });

    const result = await repo.updateCourse(courseId, updateData);
    expect(result).toEqual({
      id: courseId,
      ...updateData,
    });
    expect(MockRepo.updateCourse).toHaveBeenCalledWith(courseId, updateData);
  });

  it('should throw an error if updateCourse fails', async () => {
    const courseId = 1;
    const updateData = {
      courseId: 'update courseId',
      credits: '4',
      curriculumId: 2,
      typeCourseId: 2,
      courseNameTh: 'update courseNameTh',
      courseNameEn: 'update courseNameEn',
      courseDetail: 'update courseDetail',
      updatedDate: new Date(),
      deletedDate: null,
      updatedBy: 1,
      PrevCourse: [1, 2, 3],
    };

    MockRepo.updateCourse.mockRejectedValue(new Error('Database error'));

    await expect(repo.updateCourse(courseId, updateData)).rejects.toThrow(
      'Database error',
    );
  });

  it('should throw an error if updateCourse is called with an invalid ID', async () => {
    const courseId = -1;
    const updateData = {
      courseId: 'update courseId',
      credits: '4',
      curriculumId: 2,
      typeCourseId: 2,
      courseNameTh: 'update courseNameTh',
      courseNameEn: 'update courseNameEn',
      courseDetail: 'update courseDetail',
      updatedDate: new Date(),
      deletedDate: null,
      updatedBy: 1,
      PrevCourse: [1, 2, 3],
    };

    MockRepo.updateCourse.mockRejectedValueOnce(new Error('Invalid course ID'));
    await expect(repo.updateCourse(courseId, updateData)).rejects.toThrow(
      'Invalid course ID',
    );
  });

  it('Delete course success', async () => {
    const courseId = 1;

    MockRepo.deleteCourse.mockResolvedValue(true);

    const result = await repo.deleteCourse(courseId, 1);
    expect(result).toBe(true);
    expect(MockRepo.deleteCourse).toHaveBeenCalledWith(courseId, 1);
  });

  it('should throw an error if deleteCourse fails', async () => {
    const courseId = 1;
    MockRepo.deleteCourse.mockRejectedValue(new Error('Database error'));

    await expect(repo.deleteCourse(courseId, 1)).rejects.toThrow(
      'Database error',
    );
  });

  it('should throw an error if deleteCourse is called with an invalid ID', async () => {
    const courseId = -1;

    MockRepo.deleteCourse.mockRejectedValueOnce(new Error('Invalid course ID'));
    await expect(repo.deleteCourse(courseId, 1)).rejects.toThrow(
      'Invalid course ID',
    );
  });

  it('Count Course success', async () => {
    const query = {
      page: 1,
      pageSize: 10,
      curriculumId: 1,
      typecourseId: 1,
    };

    const courseData = [
      {
        id: 4,
        courseId: 'deserunt minim consectetur cillum commodo',
        courseNameTh: 'Alicia Howe',
        courseNameEn: 'Wayne Vandervort',
        credits: 'nisi dolor',
        courseDetail: 'ut officia',
        createdDate: new Date(),
        updatedDate: new Date(),
        deletedDate: null,
        createdBy: 1,
        updatedBy: 1,
        curriculum: {
          id: 1,
          year: '2025',
          fileUrl: 'dasd',
          createdBy: 1,
          updatedBy: 1,
          createdDat: new Date(),
          updatedDate: new Date(),
        },
        typeCourse: {
          id: 1,
          name: 'กลุ่มวิชาเฉพาะประเภทวิชาแกน',
          description: 'Learn the fundamentals of computer science.',
        },
        preCourses: [],
      },
      {
        id: 5,
        courseId: 'deserunt minim consectetur cillum commodo',
        courseNameTh: 'Alicia Howe',
        courseNameEn: 'Wayne Vandervort',
        credits: 'nisi dolor',
        courseDetail: 'ut officia',
        createdDate: new Date(),
        updatedDate: new Date(),
        deletedDate: null,
        createdBy: 1,
        updatedBy: 1,
        curriculum: {
          id: 1,
          year: '2025',
          fileUrl: 'dasd',
          createdBy: 1,
          updatedBy: 1,
          createdDate: new Date(),
          updatedDate: new Date(),
        },
        typeCourse: {
          id: 1,
          name: 'กลุ่มวิชาเฉพาะประเภทวิชาแกน',
          description: 'Learn the fundamentals of computer science.',
        },
        preCourses: [],
      },
      {
        id: 6,
        courseId: 'deserunt minim consectetur cillum commodo',
        courseNameTh: 'Alicia Howe',
        courseNameEn: 'Wayne Vandervort',
        credits: 'nisi dolor',
        courseDetail: 'ut officia',
        createdDate: new Date(),
        updatedDate: new Date(),
        deletedDate: null,
        createdBy: 1,
        updatedBy: 1,
        curriculum: {
          id: 1,
          year: '2025',
          fileUrl: 'dasd',
          createdBy: 1,
          updatedBy: 1,
          createdDate: new Date(),
          updatedDate: new Date(),
        },
        typeCourse: {
          id: 1,
          name: 'กลุ่มวิชาเฉพาะประเภทวิชาแกน',
          description: 'Learn the fundamentals of computer science.',
        },
        preCourses: [],
      },
      {
        id: 7,
        courseId: 'deserunt minim consectetur cillum commodo',
        courseNameTh: 'Alicia Howe',
        courseNameEn: 'Wayne Vandervort',
        credits: 'nisi dolor',
        courseDetail: 'ut officia',
        createdDate: new Date(),
        updatedDate: new Date(),
        deletedDate: null,
        createdBy: 1,
        updatedBy: 1,
        curriculum: {
          id: 1,
          year: '2025',
          fileUrl: 'dasd',
          createdBy: 1,
          updatedBy: 1,
          createdDate: new Date(),
          updatedDate: new Date(),
        },
        typeCourse: {
          id: 1,
          name: 'กลุ่มวิชาเฉพาะประเภทวิชาแกน',
          description: 'Learn the fundamentals of computer science.',
        },
        preCourses: [],
      },
      {
        id: 8,
        courseId: 'deserunt minim consectetur cillum commodo',
        courseNameTh: 'Alicia Howe',
        courseNameEn: 'Wayne Vandervort',
        credits: 'nisi dolor',
        courseDetail: 'ut officia',
        createdDate: new Date(),
        updatedDate: new Date(),
        deletedDate: null,
        createdBy: 1,
        updatedBy: 1,
        curriculum: {
          id: 1,
          year: '2025',
          fileUrl: 'dasd',
          createdBy: 1,
          updatedBy: 1,
          createdDate: new Date(),
          updatedDate: new Date(),
        },
        typeCourse: {
          id: 2,
          name: 'กลุ่มวิชาเฉพาะประเภทวิชาเฉพาะด้าน',
          description: 'Explore advanced mathematical concepts.',
        },
        preCourses: [
          {
            id: 4,
            courseId: 'deserunt minim consectetur cillum commodo',
            courseNameTh: 'Alicia Howe',
            courseNameEn: 'Wayne Vandervort',
            credits: 'nisi dolor',
            courseDetail: 'ut officia',
            createdDate: new Date(),
            updatedDate: new Date(),
            deletedDate: null,
            createdBy: 1,
            updatedBy: 1,
            curriculum: null,
            typeCourses: null,
            preCourses: [],
          },
          {
            id: 5,
            courseId: 'deserunt minim consectetur cillum commodo',
            courseNameTh: 'Alicia Howe',
            courseNameEn: 'Wayne Vandervort',
            credits: 'nisi dolor',
            courseDetail: 'ut officia',
            createdDate: new Date(),
            updatedDate: new Date(),
            deletedDate: null,
            createdBy: 1,
            updatedBy: 1,
            curriculum: null,
            typeCourses: null,
            preCourses: [],
          },
          {
            id: 6,
            courseId: 'deserunt minim consectetur cillum commodo',
            courseNameTh: 'Alicia Howe',
            courseNameEn: 'Wayne Vandervort',
            credits: 'nisi dolor',
            courseDetail: 'ut officia',
            createdDate: new Date(),
            updatedDate: new Date(),
            deletedDate: null,
            createdBy: 1,
            updatedBy: 1,
            curriculum: null,
            typeCourses: null,
            preCourses: [],
          },
        ],
      },
    ];

    const expectedCount = courseData.length;

    MockRepo.count.mockResolvedValue(expectedCount);
    const result = await repo.count(query);

    expect(result).toEqual(expectedCount);
    expect(MockRepo.count).toHaveBeenCalledWith(query);
  });

  it('should throw an error if count fails', async () => {
    const query = {
      page: 1,
      pageSize: 10,
      curriculumId: 1,
      typecourseId: 1,
    };
    MockRepo.count.mockRejectedValue(new Error('Database error'));

    await expect(repo.count(query)).rejects.toThrow('Database error');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
