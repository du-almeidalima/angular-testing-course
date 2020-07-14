import {TestBed} from '@angular/core/testing';
import {CoursesService} from './courses.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {COURSES, findLessonsForCourse} from '../../../../server/db-data';
import {Course} from '../model/course';
import {HttpErrorResponse} from '@angular/common/http';


// Global
let courseService: CoursesService,
  httpTestingController: HttpTestingController;

describe('CoursesService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        CoursesService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    // Assignments
    courseService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(courseService).toBeTruthy();
  });

  it('should get all courses from findAllCourses()', () => {

    courseService.findAllCourses().subscribe(courses => {
      const course12 = courses.find( c => c.id === 12);

      expect(courses).toBeTruthy('No courses returned from findAllCourses()');
      expect(courses.length).toEqual(12, 'Incorrect number of Courses, COURSES array have changed?');
      expect(course12.titles.description).toEqual('Angular Testing Course');
    });

    // Mocking/Spying on the Request
    const req = httpTestingController.expectOne('/api/courses');

    // Flushing the fake data, this will make an request and returning the data passed (Using the format expected from the request)
    req.flush( { payload: Object.values(COURSES) } );

    expect(req.request.method).toEqual('GET');
  });

  it('should save the course data from saveCourse()',  () => {
    const courseId = 12;
    const changes: Partial<Course> = { titles: { description: 'Ng Angular Course' } };

    courseService.saveCourse(courseId, changes).subscribe( course => {
      expect(course.id).toEqual(courseId);
    });

    const req = httpTestingController.expectOne(`/api/courses/${courseId}`);
    req.flush({
      ...COURSES[courseId],
      ...changes
    });

    expect(req.request.method).toEqual('PUT');
    expect(req.request.body.titles.description).toEqual(changes.titles.description);
  });

  it('should give an error if save course fails', () => {
    const courseId = 12;
    const changes: Partial<Course> = { titles: { description: 'Fail Course' } };

    courseService.saveCourse(courseId, changes).subscribe(
      () => fail('should never execute on HTTP Failure'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpTestingController.expectOne(`/api/courses/${courseId}`);
    req.flush('Save course failed', {status: 500, statusText: 'Internal Server Error'});

    expect(req.request.method).toBe('PUT');
  });

  it('should find a list of lessons from findLessons()', () => {
    const courseId = 12;
    const pageSize = 3;
    const sortOrder = 'asc';

    courseService.findLessons(courseId, '', sortOrder, 0, pageSize)
      .subscribe(lessons => {

        expect(lessons).toBeTruthy();
        expect(lessons.length).toBeLessThanOrEqual(pageSize);
      });

    const req = httpTestingController.expectOne(req => req.url == '/api/lessons');

    // Simulating a response
    req.flush({
      payload: findLessonsForCourse(courseId).slice(0, pageSize)
    });

    expect(req.request.method === 'GET');

    expect(req.request.params.get('courseId')).toEqual(courseId.toString());
    expect(req.request.params.get('pageSize')).toEqual(pageSize.toString());
    expect(req.request.params.get('filter')).toEqual('');
    expect(req.request.params.get('sortOrder')).toEqual(sortOrder);
  });
});

/**
 * HttpTestingController allows to fake HttpRequests data
 */
