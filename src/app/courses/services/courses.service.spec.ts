import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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
});


/**
 * HttpTestingController allows to fake HttpRequests data
 */
