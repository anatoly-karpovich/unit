import { expect } from 'chai';
import Student from '../classes/student.js';

describe('Student tests', () => {
  it('Should create a new Student with valid data', () => {
    const student = new Student('Tatiana', 0);
    expect(student.name).to.equal('Tatiana');
    expect(student.numberOfSkippedHWs).to.equal(0);
  });

  it('Should not create student with empty name', () => {
    try {
      new Student('', 0);
    } catch (e: any) {
      expect(e.message).to.equal("Invalid name");
    }
  });
});
