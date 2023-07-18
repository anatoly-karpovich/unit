import type { IStudent } from "../types/student.types.js"

export function getStudentInfo(student: IStudent) {
  return `Student ${student.name} skipped ${student.numberOfSkippedHWs} homeworks`
}

export const getSummm = (a:number, b:number) => a + b;

export function calculate(a: number, b: number): number {
  return a + b;
}

interface IUser {
  name: string;
  age: number;
}


const db: IUser[] = [
  { name: "Dzmitry", age: 30 },
  { name: "Tatiana", age: 30 },
  { name: "Anastasia", age: 30 },
];

interface ServiceResponse {
  status: number;
}

interface UserServiceResponse extends ServiceResponse {
  data: IUser
}

interface UserServiceError extends ServiceResponse {
  message: string;
}

const getUser = (username: string): Promise<UserServiceResponse | UserServiceError> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Preparing response");
      const userFromDataBase = db.find((user) => user.name === username);
      if (userFromDataBase) {
        const response = {
          status: 200,
          data: userFromDataBase,
        };
        resolve(response);
      } else {
        const response = {
          status: 404,
          message: `${username} not found`,
        };
        reject(response);
      }
    }, 1000);
  });
};


export async function getUserData(username: string): Promise<IUser> {
  try {
    const response: any = await getUser(username);

    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      throw new Error(response.message);
    }
  } catch (error: any) {
    throw new Error(`API request failed: ${error.message}`);

  }
}


export function isPalindrome(input: string): boolean {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleanedInput = input.replace(/[^a-zA-Z0-9]/g, '') //.toLowerCase();
  
  // Compare the cleaned string with its reverse
  return cleanedInput === cleanedInput.split('').reverse().join('');
}