import { IStudent } from '../types/student.types.js';

export default class Student implements IStudent {
  constructor(
    public name: string,
    public numberOfSkippedHWs: number
  ) {
    if (this.isValidName(name)) {
      this.name = name;
    } else {
      throw new Error('Invalid name');
    }
    this.numberOfSkippedHWs = numberOfSkippedHWs;
  }

  private isValidName(name: string) {
    // Check if the name length is between 3 and 20 characters
    if (name.length < 3 || name.length > 20) {
      return false;
    }

    // Check if the name contains only alphanumeric characters and underscores
    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      return false;
    }

    // Check if the name starts and ends with an alphanumeric character
    if (!/^[a-zA-Z0-9]/.test(name) || !/[a-zA-Z0-9]$/.test(name)) {
      return false;
    }

    // Additional custom validations can be added here if needed

    return true;
  }
}
