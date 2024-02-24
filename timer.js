let timer;

const setTimer = (counter) => {
  return counter < 10 ? `0${String(counter)}` : String(counter);
};

const startTimer = (element1, element2, duration) => {
  let counter = duration / 1000 - 1;

  element1.innerText = setTimer(counter);
  element2.innerText = setTimer(counter);

  timer = setInterval(() => {
    if (counter === 0) {
      clearInterval(timer);
      element1.innerText = "--";
      element2.innerText = "--";
      return;
    }

    element1.innerText = setTimer(counter);
    element2.innerText = setTimer(counter);
    counter--;
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timer);
};

export { startTimer, stopTimer };
