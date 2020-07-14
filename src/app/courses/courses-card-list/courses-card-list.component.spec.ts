import {CoursesCardListComponent} from './courses-card-list.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';


describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoursesModule]
    })
      .compileComponents()
      .then(() => {
        // beforeEach test a new instance of the component will be created
        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  }));

  it('should create the component', () => {
    console.log(component);
    expect(component).toBeTruthy();
  });


  it('should display the course list', () => {

    component.courses = setupCourses();
    fixture.detectChanges();

    const carts = el.queryAll(By.css('mat-card'));

    expect(carts).toBeTruthy();
    expect(carts.length).toBe(component.courses.length);
  });


  it('should display the first course', () => {

    component.courses = setupCourses();
    fixture.detectChanges();

    const firstCourse = component.courses[0];
    const firstCard = el.query(By.css('mat-card:first-child'));
    const firstCardTitle = firstCard.query(By.css('mat-card-title'));
    const firstCardImg = firstCard.query(By.css('img'));

    expect(component.courses).toBeTruthy('failed to get courses');
    expect(firstCard).toBeTruthy('failed to get card from the list');
    expect(firstCardTitle.nativeElement.textContent).toEqual(firstCourse.titles.description, `diverging title description`);
    expect(firstCardImg.attributes.src).toEqual(firstCourse.iconUrl, `image doesn't match course url`);
  });


});

/**
 * Async: Async is a utility provided by Angular that wraps a block. It will wait up to 5 seconds for all Asynchronous
 * code within that block to resolver and that I'll proceed to test. It basically waits for the Async code to end before
 * completed the function.
 */
