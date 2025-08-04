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
        count: jest.fn()
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
        const courseId = 1;
        const courseData = {
            id: courseId,
            courseId: 'test courseId',
            credits: 3,
            curriculumId: 1,
            typeCourseId: 1,
            courseNameTh: 'test courseNameTh',
            courseNameEn: 'test courseNameTh',
            courseDetail: 'test courseDetail',
            createdDate: new Date(),
            updatedDate: new Date(),
            deletedDate: null,
            createdBy: 1,
            updatedBy: 1,
            PrevCourse: [1, 2, 3],
        };

        MockRepo.getCourse.mockResolvedValue(courseData);

        const result = await repo.getCourse({
            page: 1,
            pageSize: 10,
            searchByTypeCourse: 'all',
        });
        expect(result).toEqual(courseData);
        expect(MockRepo.getCourse).toHaveBeenCalledWith({
            page: 1,
            pageSize: 10,
            searchByTypeCourse: 'all',
        });
    });

    it('should throw an error if getCourse fails', async () => {
        MockRepo.getCourse.mockRejectedValue(new Error('Database error'));

        await expect(
            repo.getCourse({ page: 1, pageSize: 10, searchByTypeCourse: 'all', }),
        ).rejects.toThrow('Database error');
    });

    it('Get Course by ID success', async () => {
        const courseId = 1;
        const courseData = {
            id: courseId,
            courseId: 'test courseId',
            credits: 3,
            curriculumId: 1,
            typeCourseId: 1,
            courseNameTh: 'test courseNameTh',
            courseNameEn: 'test courseNameTh',
            courseDetail: 'test courseDetail',
            createdDate: new Date(),
            updatedDate: new Date(),
            deletedDate: null,
            createdBy: 1,
            updatedBy: 1,
            PrevCourse: [1, 2, 3],
        };

        MockRepo.getCourseById.mockResolvedValue(courseData);

        const result = await repo.getCourseById(courseId);
        expect(result).toEqual(courseData);
        expect(MockRepo.getCourseById).toHaveBeenCalledWith(courseId);
    });

    it('should throw an error if getCourseById fails', async () => {
        const courseId = 1;
        MockRepo.getCourseById.mockRejectedValue(new Error('Database error'));

        await expect(repo.getCourseById(courseId)).rejects.toThrow('Database error');
    });

    it('should throw an error if getCourseById is called with an invalid ID', async () => {
        const courseId = -1;
        MockRepo.getCourseById.mockRejectedValueOnce(new Error('Invalid course ID'));
        await expect(repo.getCourseById(courseId)).rejects.toThrow('Invalid course ID');
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
            PrevCourse: [1, 2, 3],
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
        await expect(repo.createCourse(courseData)).rejects.toThrow('Database error');
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
            PrevCourse: [1, 2, 3],
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
})
