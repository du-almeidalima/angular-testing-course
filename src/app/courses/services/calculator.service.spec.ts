import {CalculatorService} from "./calculator.service";
import {LoggerService} from "./logger.service";

describe('CalculatorService', () => {
  // Defining the beforeEach variables "globally" so they can be accessed inside the spec
  let loggerService: LoggerService;
  let calculatorService: CalculatorService;

  // This block will be executed before each specifications (it())
  beforeEach(() => {
    console.log('Calling beforeEach');
    loggerService = jasmine.createSpyObj('LoggerService', ['log']);
    calculatorService = new CalculatorService(loggerService);
  })

  it('should add 2 numbers', function () {
    console.log('Add Test');
    const result = calculatorService.add(4, 2);

    expect(result).toBe(6);
    expect(loggerService.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract 2 numbers', function () {
    // Jasmine will create a completely fake version of this Class
    console.log('Subtract Test');
    const result = calculatorService.subtract(4, 2);

    expect(result).toBe(2, 'Unexpected Subtraction Result');
  });
})
