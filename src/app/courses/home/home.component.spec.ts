import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {of} from 'rxjs';

import {CoursesModule} from '../courses.module';
import {HomeComponent} from './home.component';
import {CoursesService} from '../services/courses.service';
import {setupCourses} from '../common/setup-test-data';
import {click} from '../common/test-utils';

describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let coursesService: jasmine.SpyObj<CoursesService>;

  beforeEach(async(() => {
    const spyCoursesService = jasmine.createSpyObj('CoursesService', ['findAllCourses']);

    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: CoursesService, useValue: spyCoursesService }
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        coursesService = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
      });
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should display only beginner courses', () => {
    const beginnerCourses = setupCourses().filter(c => c.category === 'BEGINNER');
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    const tabLabelTextContent = el.query(By.css('.mat-tab-label-content')).nativeElement.textContent;

    expect(tabs.length).toEqual(1, 'Should have only one tab');
    expect(tabLabelTextContent.toLowerCase()).toContain('beginners', 'Tab should have the Beginners tab label');
  });


  it('should display only advanced courses', () => {
    const advancedCourses = setupCourses().filter(c => c.category === 'ADVANCED');
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    const tabLabelTextContent = el.query(By.css('.mat-tab-label-content')).nativeElement.textContent;

    expect(tabs.length).toEqual(1, 'Should have only one tab');
    expect(tabLabelTextContent.toLowerCase()).toContain('advanced', 'Tab should have the Advanced tab label');
  });


  it('should display both tabs', () => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toEqual(2, 'Should have both tabs available');
  });


  // The DoneFn tells Jasmine this is a async test and it will only complete when this function is called
  it('should display advanced courses when tab clicked', (done: DoneFn) => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    /* Native Click  API (DOM) */
    // tabs[1].nativeElement.click();

    /* Using DebugElement API */
    tabs[1].triggerEventHandler('click', { button: 0 });
    fixture.detectChanges();

    setTimeout(() => {
      const cardTitles = el.queryAll(By.css('.mat-tab-body-active .mat-card-title'));

      // Advanced Tab (Second Tab)
      expect(cardTitles[0].nativeElement.textContent).toContain('Angular Security Course');
      done();
    }, 1000);
  });

});


