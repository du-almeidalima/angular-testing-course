import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { COURSES } from '../../../../server/db-data';


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
});


/**
 * HttpTestingController allows to fake HttpRequests data
 */
