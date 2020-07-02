import {CalculatorService} from "./calculator.service";
import {LoggerService} from "./logger.service";

describe('CalculatorService', () => {
  it('should add 2 numbers', function () {
    const loggerService = new LoggerService();
    spyOn(loggerService, 'log');
    const calculatorService = new CalculatorService(loggerService);

    const result = calculatorService.add(4, 2);

    expect(result).toBe(6);
    expect(loggerService.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract 2 numbers', function () {
    const calculatorService = new CalculatorService(new LoggerService());
    const result = calculatorService.subtract(4, 2);

    expect(result).toBe(2, 'Unexpected Subtraction Result');
  });
})
