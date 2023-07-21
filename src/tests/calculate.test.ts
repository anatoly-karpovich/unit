import { calculate } from '../functions/student.functions.js';
import { expect, assert } from 'chai';

describe('Math Functions', () => {
  it('should add two numbers correctly', () => {
    const result = calculate(2, 3);

    // Using `expect`
    expect(result).to.equal(5);

    // Using `assert`
    assert.equal(result, 5);
  });

  it('should return the correct result for negative numbers', () => {
    const result = calculate(-5, 3);

    // Using `expect`
    expect(result).to.equal(-2);

    // Using `assert`
    assert.strictEqual(result, -2);
  });
  it('should handle floating-point arithmetic', () => {
    const result = calculate(0.1, 0.2);

    // Using `expect` with `closeTo` for floating-point comparisons
    expect(result).to.be.closeTo(0.3, 0.001);

    // Using `assert` with `closeTo`
    assert.closeTo(result, 0.3, 0.001);
  });
});
