import {CalculatorService} from "./calculator.service";
import {LoggerService} from "./logger.service";

describe('CalculatorService', () => {
  it('should add 2 numbers', function () {
    const loggerService = new LoggerService();
    /* Jasmine will install an spy on the existing object and replace its functionality, useful when there's a need to
    Spy on an existing object */
    spyOn(loggerService, 'log');
    const calculatorService = new CalculatorService(loggerService);

    const result = calculatorService.add(4, 2);

    expect(result).toBe(6);
    expect(loggerService.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract 2 numbers', function () {
    // Jasmine will create a completely fake version of this Class
    const loggerService = jasmine.createSpyObj('LoggerService', ['log']);
    const calculatorService = new CalculatorService(loggerService);
    const result = calculatorService.subtract(4, 2);

    expect(result).toBe(2, 'Unexpected Subtraction Result');
  });
})
