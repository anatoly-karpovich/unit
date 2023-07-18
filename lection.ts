/*
//TODO: Init

Итак, сегодня мы начнем уже работать с проектом в TS\JS, который не состоит из сугубо одного файлика, имеет структуру и управляющие вещи.

Обязательно убедитесь, что мы находимся в ПАПКЕ НАШЕГО ПРОЕКТА!
Чтобы инициализировать проект мы пропишем команду npm init. 

Далее нам будет предложено заполнить поля:
  package name - название нашего приложения, test-project
  version - 1.0.0
  description - Test project on aqa course
  entry point: (index.js)
  test command:                                                                                                                                                              
  git repository:                                                                                                                                                                 
  keywords: typescript javascript qa automation
  author: Anatoly Karpovich
  license: (ISC)  


После этого у нас появляется package.json файл.

Если же мы не хотим прописывать что-то изначально на стадии инициализации, мы можем ввести:
  - npm init --yes
  ИЛИ
  - npm init --y

Итак, главная причина зачем нам package.json файл - возможность работать с модулями, особенно добавляемыми из вне, т.е. с библиотеками

Давайте теперь установим наш первый модуль в проект, а точнее тайпскрипт!
  npm install typescript --save-dev

И вы тутже спросите: а зачем нам ставить ТС, если мы уже на комп установили? СТавится он тут именно в проект, чтобы при работе с ним каждый человек,
а также сиайка/сборщик знали что для работы с ним ТС должен быть. Даже если у вас ТС не будет на компе, то при разворачивании проекта с установленным
тс модулем - с тс вы сможете работать в рамках проекта.

Что же означает --save-dev? Давайте обратим внимание, что ТС установился в devDependencies. МОдули из этой графы будут использоваться ТОЛЬКО ВО ВРЕМЯ РАЗРАБОТКИ,
в финальном билде их не будет на отсутствием необходимости (Всё равно проект будет работать по итогу с чистым JS)

И теперь давайте напишем нашу первую команду! Она будет компилировать TS в JS
  "build": "tsc"

Теперь давайте немного реорганизуем нашу структуру:
  Создадим папку src в которой и будет лежать наш основной файл - index.ts

Давайте также проинициализируем и tsconfig
  tsc --init

А также внесем несколько дополнений:
  1. Создадим папку, в которую у нас и будет компилироваться наш проект
    "outDir": "./dist"
  2. "target": "ES6",
  3. "module": "NodeNext",
  4. Добавим includes, чтобы тайпскрипт знал какие и где файлы компилировать
    "include": ["src/** / *"] - Добавляем ПОСЛЕ compilerOptions (убрать пробелы ненужные между слешами)
  5. Добавим exclude, чтобы ТС знал в какие папки лезть не надо
    "exclude": ["node_modules"]

Далее добавим в package.json указание, что мы будем работать именно с модулями:
  "type": "module", - сразу после main

Теперь давайте в index.ts файле напишем немного кода
  interface IStudent {
    name: string;
    numberOfSkippedHWs: number;
  }

  function getStudentInfo(student: IStudent) {
    return `Student ${student.name} skipped ${student.numberOfSkippedHWs} homeworks`
  }

  const students: IStudent[] = []

  students.push({
    name: 'Anastasia',
    numberOfSkippedHWs: 2,
  })


  students.push({
    name: 'Volodymir',
    numberOfSkippedHWs: 0,
  })

  students.forEach(student => console.log(getStudentInfo(student)))

И проверим наш скрипт, запустим:
  npm run build

Как видим, в папке dist появился index.js файлик со скомпилированным кодом. Эту команду мы сможем в дальнейшем использовать в других скриптах, которые
будут уже запускать наш проект!

//TODO: Import/Export

ИМПОРТИРУЕМ ВСЕ С .js изза NODE NEXT

А теперь давайте воспользуемся плюсами от модулей, и разделим наш код на файлы логически!:
  - создадим папку types
  - в ней файл student.types.ts
  - в этот файл перенесем интерфейс IStudent

  - создадим папку functions
  - в ней создадим файл student.functions.ts
  - в этот файл перенесем функцию getStudentInfo

  - А также пропишем необходимые экспорты и импорты!
  - И разумеется скомпилируем!

Теперь давайте разбираться в том, что мы написали!

По своей сути модуль - отдельный файл.
  - export отмечает переменные и функции, которые должны быть доступны вне текущего модуля.
  - import позволяет импортировать функциональность из других модулей.

ВАЖНО!! Обратите внимание, что мы прописываем путь к модулю ОТ ФАЙЛА КУДА ИМПОРТИРУЕМ, а не от корня проекта!

Также следует заметить, что импорт работает только первый! Повторно в одном файле делать не выйдет - будет ошибка!

Давайте теперь поближе посмотрим на возможности экспорта!

Экспортировать мы можем несколькими способами:

  - export function getStudentInfo(){}
  - function getStudentInfo(){}; export { getStudentInfo }

Также экспортировать можно несколько функций из файла (показать)
  - export const getSummm = (a:number, b:number) => a + b;

Разумеется помимо функций экспортировать можем и переменные, и классы (показать)

Когда мы пользуемся выше показанными форматами экспорта - при импорте мы в {} должны четко указать названия сущностей, которые импортируем, 
так как они названы в файле с экспортом

Но мы можем заменить это навание, используя ключевое слово as:
  - export { getStudentInfo as getInfo }

Также и в импорте мы можем переименовывать, например
  - import { getStudentInfo as getInfo } from ...

Импортировать мы можем зараз любое количество экспортированных сущностей из модуля
 - import { getStudentInfo, getSumm } from ".."

Также, мы можем помимо указывания в {} названий сущностей что импортируем, можем указать что хотим ВСЁ!
  import  * as all  from "./functions/student.functions"
  students.forEach(student => console.log(all.getStudentInfo(student)))

//TODO: Default import

Если у нас в файле ровно одна сущность для экспорта - мы можем пользоваться делать дефолтный экспорт:

  export default class Student implements IStudent {
    constructor(public name: string, public numberOfSkippedHWs: number) {
      this.name = name;
      this.numberOfSkippedHWs = numberOfSkippedHWs;
    }
  }

Импортируем же мы такие сущности (дефолтные) уже без {} 
  import Student from "..."

Также, в виду дефолтного экспорта, при импорте можно без as обзывать как угодно

  import s from ".."

//TODO: Library

Итак, мы рассмотрели работу с модулями, создаваемыми своими руками. Теперь давайте рассмотрим работу со сторонними библиотеками!
Установим одну из самых популярных и часто устанавливаемых - lodash
  npm i lodash
  npm i @types/lodash -D

Вторым импортом мы добавили TS типизацию данной библиотеки

const s1 = new Student('Anastasia', 2)
const s2: IStudent = { name: 'Anastasia', numberOfSkippedHWs: 2 }
const s3: IStudent = { name: 'Anastasia', numberOfSkippedHWs: 2 }

console.log(_.isEqual(s3, s2))
console.log(_.isEqual(s1, s2))

//TODO: Unit testing - easy

Давайте напишем простую функцию:

export function calculate(a: number, b: number): number {
  return a + b;
}

На вид код не должен содержать ошибок, НО! Всегда стоит перестраховаться, и удостовериться что ошибок в коде точно нет.
Но теперь давайте будем делать эти проверки не консольлогами, а напишем простые юнит тесты для данной функции!

Для начала установим библиотеку для тестирования. В нашем случае - это mocha

  npm install mocha @types/mocha --save-dev

А также установим библиотеку для валидации результатов. Ровно ту, что используется в Postman:
  npm install chai @types/chai --save-dev

Далее создадим папку, в которой и будут лежать наши тесты (src/tests)
И создадим файл calculate.test.ts со следующими тестами:

  describe('Math Functions', () => {
    it('should add two numbers correctly', () => {
      const result = calculate(2, 3);
      expect(result).to.equal(5);
    });
  });

И запустим командой npx mocha dist/tests/calculate.test.js  УДАЛИТЬ ПРОБЕЛЫ!

Давайте взглянем на возможности ассертов:


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
Теперь давайте добавим валидашек в наш класс Student для поля name

  export default class Student implements IStudent {
    constructor(public name: string, public numberOfSkippedHWs: number) {
      if(this.isValidName(name)) {
        this.name = name
      } else {
        throw new Error("Invalid name")
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

  ИНТЕРАКТИВ - Давайте и для него напишем юнит тесты (пусть ребята набрасывают тосты)


Если тестов будет больше 1 файла - смело юзаем npx mocha dist/tests/** / *.test.js  УДАЛИТЬ ПРОБЕЛЫ!

Но пока нам каждый раз приходится ребилдить вручную проект! Давайте и этот степ автоматизируем:
Мы добавим шаг с билдом прекондишеном к команде тест

    "pretest": "npm run build",
    "test": "npx mocha dist/tests/** / *.test.js"


Также у моки есть Хуки - функции срабатывающие в опредленный момент. Заострять на них внимание сейчас не будем - ближе познакомимся в рамках автотестов

  describe('Math Functions', () => {
    let result: number;

    before(() => {
      // This hook runs once before any test case in the describe block
      console.log('Running before hook');
    });

    after(() => {
      // This hook runs once after all test cases in the describe block
      console.log('Running after hook');
    });

    beforeEach(() => {
      // This hook runs before each test case in the describe block
      console.log('Running beforeEach hook');
    });

    afterEach(() => {
      // This hook runs after each test case in the describe block
      console.log('Running afterEach hook');
    });

    it('should multiply two numbers correctly', () => {
      result = multiply(2, 3);
      expect(result).to.equal(6);
    });

    it('should multiply two negative numbers', () => {
      result = multiply(-5, -3);
      expect(result).to.equal(15);
    });

    it('should multiply a number by 0', () => {
      result = multiply(5, 0);
      expect(result).to.equal(0);
    });
  });


//TODO: Async unit testing

Давайте напишем функцию как была в лекции с промисами для имитации апи

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

  И напишем на нее юниты:

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

//TODO: TDD:

Итак, суть подхода заключается в том, что мы сначала пишем тесты, а потом реализуем функцию так, чтобы все тесты были пройдены успешно!

Создадим функцию isPalindrome без реализации

И напишем юнит тесты:

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

А затем будем реализовывать функцию и постепенно "зеленить" тесты!

  export function isPalindrome(input: string): boolean {  
    // Compare the cleaned string with its reverse
    return input === input.split('').reverse().join('');
  }

А затем допишем удаление НЕ букв

  export function isPalindrome(input: string): boolean {
    // Remove non-alphanumeric characters and convert to lowercase
    const cleanedInput = input.replace(/[^a-zA-Z0-9]/g, '')
    
    // Compare the cleaned string with its reverse
    return cleanedInput === cleanedInput.split('').reverse().join('');
  }


А потом и приведение к нижнему регистру
  export function isPalindrome(input: string): boolean {
    // Remove non-alphanumeric characters and convert to lowercase
    const cleanedInput = input.replace(/[^a-zA-Z0-9]/g, '')
    
    // Compare the cleaned string with its reverse
    return cleanedInput === cleanedInput.split('').reverse().join('');
  }
*/

