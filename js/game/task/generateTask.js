const dictionary = require('./dictionary');

export const generateTask = () => {
  let math;
  let task = Object.assign({}, dictionary);
  const operator = ['+', '-', '*'];
  let firstMember = Math.floor(Math.random() * 15 + 1);
  let secondMember = Math.floor(Math.random() * 15 + 1);
  math = firstMember + operator[Math.floor(Math.random() * 3)] + secondMember;
  task.math = math;

  return task;
};