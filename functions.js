const redTrafficLight1 = document.querySelector("#board-1 .red-light");
const orangeTrafficLight1 = document.querySelector("#board-1 .orange-light");
const greenTrafficLight1 = document.querySelector("#board-1 .green-light");
const redTrafficLight2 = document.querySelector("#board-2 .red-light");
const orangeTrafficLight2 = document.querySelector("#board-2 .orange-light");
const greenTrafficLight2 = document.querySelector("#board-2 .green-light");

const longLightDuration = 4000;
const shortLightDuration = 1000;

const changeLight = (element, status) => {
  if (status === true) {
    element.classList.add("active");
    return;
  }

  element.classList.remove("active");
};

const switchLights = () => {
  changeLight(greenTrafficLight1, true);
  changeLight(redTrafficLight2, true);

  setTimeout(() => {
    changeLight(greenTrafficLight1, false);
    changeLight(orangeTrafficLight1, true);

    changeLight(orangeTrafficLight2, true);

    setTimeout(() => {
      changeLight(orangeTrafficLight1, false);
      changeLight(redTrafficLight1, true);

      changeLight(orangeTrafficLight2, false);
      changeLight(redTrafficLight2, false);
      changeLight(greenTrafficLight2, true);

      setTimeout(() => {
        changeLight(orangeTrafficLight1, true);
        changeLight(orangeTrafficLight2, true);
        changeLight(greenTrafficLight2, false);

        setTimeout(() => {
          changeLight(orangeTrafficLight1, false);
          changeLight(orangeTrafficLight2, false);
          changeLight(redTrafficLight1, false);

          switchLights();
        }, shortLightDuration);
      }, longLightDuration);
    }, shortLightDuration);
  }, longLightDuration);
};

// Clear all setTimeout
const clearTimeouts = () => {
  let id = setTimeout(() => {});
  while (id--) clearTimeout(id);
};

const startTrafficLights = () => {
  switchLights();
};

startTrafficLights();
