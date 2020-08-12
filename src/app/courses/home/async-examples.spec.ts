describe('Async Testing Examples', () => {

  /* Not the best solution, because it only work for only level of Async */
  it('Asynchronous test example with Jasmine done() ', (done: DoneFn) => {
    console.log('Test 1 Started');
    let test = false;

    setTimeout(() => {
      test = true;
      console.log('Test 1 Running Assertions on setTimeout');
      expect(test).toBeTruthy();

      done();
    }, 500);
  });

});
