import type { IStudent } from './types/student.types.js';
import * as all from './functions/student.functions.js';
import Student from './classes/student.js';

import _ from 'lodash';

const s1 = new Student('Anastasia', 2);
const s2: IStudent = { name: 'Anastasia', numberOfSkippedHWs: 2 };
const s3: IStudent = { name: 'Anastasia', numberOfSkippedHWs: 2 };

console.log(_.isEqual(s1, s2));
console.log(_.isEqual(s3, s2));

const students: IStudent[] = [];

students.push(s1);

students.push({
  name: 'Volodymir',
  numberOfSkippedHWs: 0
});

students.forEach((student) => console.log(all.getStudentInfo(student)));
