import {CalculatorService} from "./calculator.service";
import {LoggerService} from "./logger.service";
import { TestBed } from "@angular/core/testing";

describe('CalculatorService', () => {
  let calculatorService: CalculatorService,
      loggerServiceSpy: any;

  beforeEach(() => {
    // Mocks
    loggerServiceSpy = jasmine.createSpyObj('LoggerService', ['log']);
    /* TestBed: This allows us to configure the environment of our test, for example, the modules to work with Dependency Injection */
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerServiceSpy }
      ]
    });

    // Getting the CalculatorService by Dependency Injection
    calculatorService = TestBed.inject(CalculatorService);
  });

  it('should add 2 numbers', function () {
    const result = calculatorService.add(4, 2);

    expect(result).toBe(6);
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract 2 numbers', function () {
    const result = calculatorService.subtract(4, 2);

    expect(result).toBe(2, 'Unexpected Subtraction Result');
  });
})
