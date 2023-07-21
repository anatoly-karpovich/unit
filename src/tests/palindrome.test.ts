import { expect } from 'chai';
import { isPalindrome } from '../functions/student.functions.js';

describe('Palindrome Functions', () => {
  it('should identify palindromes with even-length strings', () => {
    expect(isPalindrome('radar')).to.be.true;
  });

  it('should identify palindromes with odd-length strings', () => {
    expect(isPalindrome('level')).to.be.true;
  });

  it('should ignore spaces and capitalization', () => {
    expect(isPalindrome('A man a plan a canal Panama')).to.be.true;
  });

  it('should identify non-palindromes', () => {
    expect(isPalindrome('hello')).to.be.false;
  });

  it('should handle empty strings as palindromes', () => {
    expect(isPalindrome('')).to.be.true;
  });
});
