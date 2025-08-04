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
            courseId: 'CSS111',
            credits: 3,
            curriculumId: 1,
            typeCourseId: 1,
            courseNameTh: 'เอ็กพอริ่ง คอมพิวเตอร์ ไซน์',
            courseNameEn: 'EXPLORING COMPUTER SCIENCE',
            courseDetail: 'Introduction to computer systems and computer science. Components of a computer system. Number systems and conversion.Boolean algebras and logic circuits. Manipulation of data. Operating systems, networking and Internet. Algorithms and programming. Database systems and software engineering. Artificial Intelligence. Computer professionals, social roles, ethics and laws related to computer science. Practice of computer programming for basic problems. Data, data types, expressions and introductory programming constructs.ระบบคอมพิวเตอร์และวิทยาการคอมพิวเตอร์เบื้องต้น ส่วนประกอบของระบบคอมพิวเตอร์ ระบบเลขฐานและการแปลงฐานเลข พีชคณิตบูลีนและวงจรตรรกะ การประมวลผลข้อมูล ระบบปฏิบัติการ เครือข่าย และอินเทอร์เน็ต ขั้นตอนวิธีและการเขียนโปรแกรม ระบบฐานข้อมูลและวิศวกรรมซอฟต์แวร์ ปัญญาประดิษฐ์เบื้องต้น วิชาชีพทางคอมพิวเตอร์และบทบาททางสังคม กฎหมายและจริยธรรมเกี่ยวกับวิทยาการคอมพิวเตอร์ ฝึกเขียนโปรแกรมคอมพิวเตอร์เพื่อแก้ปัญหาระดับพื้นฐาน ข้อมูล ชนิดข้อมูล นิพจน์และโครงสร้างการเขียนโปรแกรมเบื้องต้น',
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
            courseId: 'CSS111',
            credits: 3,
            curriculumId: 1,
            typeCourseId: 1,
            courseNameTh: 'เอ็กพอริ่ง คอมพิวเตอร์ ไซน์',
            courseNameEn: 'EXPLORING COMPUTER SCIENCE',
            courseDetail: 'Introduction to computer systems and computer science. Components of a computer system. Number systems and conversion.Boolean algebras and logic circuits. Manipulation of data. Operating systems, networking and Internet. Algorithms and programming. Database systems and software engineering. Artificial Intelligence. Computer professionals, social roles, ethics and laws related to computer science. Practice of computer programming for basic problems. Data, data types, expressions and introductory programming constructs.ระบบคอมพิวเตอร์และวิทยาการคอมพิวเตอร์เบื้องต้น ส่วนประกอบของระบบคอมพิวเตอร์ ระบบเลขฐานและการแปลงฐานเลข พีชคณิตบูลีนและวงจรตรรกะ การประมวลผลข้อมูล ระบบปฏิบัติการ เครือข่าย และอินเทอร์เน็ต ขั้นตอนวิธีและการเขียนโปรแกรม ระบบฐานข้อมูลและวิศวกรรมซอฟต์แวร์ ปัญญาประดิษฐ์เบื้องต้น วิชาชีพทางคอมพิวเตอร์และบทบาททางสังคม กฎหมายและจริยธรรมเกี่ยวกับวิทยาการคอมพิวเตอร์ ฝึกเขียนโปรแกรมคอมพิวเตอร์เพื่อแก้ปัญหาระดับพื้นฐาน ข้อมูล ชนิดข้อมูล นิพจน์และโครงสร้างการเขียนโปรแกรมเบื้องต้น',
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
})
