const dictionary = require('./dictionary');
const capitals = require('./capitals');
const riddles = require('./riddles');

export const generateTask = () => {
  let math;
  let task = Object.assign({}, dictionary);
  const operator = ['+', '-', '*'];
  let firstMember = Math.floor(Math.random() * 15 + 1);
  let secondMember = Math.floor(Math.random() * 15 + 1);
  math = firstMember + operator[Math.floor(Math.random() * 3)] + secondMember;

  let sort = [];
  for (let i = 0; i < 4; i++) {
    sort.push(Math.floor(Math.random() * 100));
  }

  const recognizer = new webkitSpeechRecognition();
  recognizer.interimResults = true;
  recognizer.lang = 'en-US';

  const toBin = Math.floor(Math.random() * 10) + 5;

  task.recognizer = recognizer;
  task.math = math;
  task.capitals = capitals;
  task.sort = sort;
  task.riddles = riddles;
  task.toBin = toBin;

  return task;
};