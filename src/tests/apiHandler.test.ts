import { expect } from "chai";
import { getUserData } from "../functions/student.functions.js";

describe('API Handler tests', () => {
  it('should fetch user data correctly', async () => {
    const username = 'Dzmitry';

    // Test the API handler function
    const userData = await getUserData(username);

    // Make assertions on the result
    expect(userData).to.deep.equal({ name: 'Dzmitry', age: 30 });
  });

  it('should handle user not found', async () => {
    const username = 'Alice';

    try {
      // Test the API handler function
      await getUserData(username);
    } catch (error: any) {
      // Ensure the error is handled properly
      expect(error.message).to.equal(`API request failed: ${username} not found`);
    }
  });
});