export const shuffle = array => {
  let currentIndex = array.length,
      temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};
export const arrayRandomNumber = arr => {
  return Math.floor(Math.random() * arr.length);
};

export const pushLocalStorage = (location, obj) => {
  const oldResults = JSON.parse(localStorage.getItem(location)) || [];
  oldResults.push(obj);
  localStorage.setItem(location, JSON.stringify(oldResults));
};