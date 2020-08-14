import {fakeAsync, flush, tick} from '@angular/core/testing';

describe('Async Testing Examples', () => {

  /* Not the best solution, because it only work for only level of Async */
  it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();

      done();
    }, 500);
  });

  /* Simulating the passage of time asynchronously */
  it('Asynchronous test example with fakeAsync', fakeAsync(() => {
    let test = false;

    setTimeout(() => { test = true; }, 500);

    tick(500);

    expect(test).toBeTruthy();
  }));

  /* Simulating the passage of time asynchronously for lots of async code */
  it('Asynchronous test example with fakeAsync lots of async operations', fakeAsync(() => {
    let test = false;

    setTimeout(() => {}, 300);
    setTimeout(() => {
      setTimeout(() => { test = true; }, 300);
    }, 500);

    flush();

    expect(test).toBeTruthy();
  }));
});
