import { changeLight, changeColorIcon } from "./changeLight.js";
import { startTimer, stopTimer } from "./timer.js";

// TODO: Refactor this code
const redTrafficLight1 = document.querySelector("#board-1 .red-light");
const orangeTrafficLight1 = document.querySelector("#board-1 .orange-light");
const greenTrafficLight1 = document.querySelector("#board-1 .green-light");
const redTrafficLight2 = document.querySelector("#board-2 .red-light");
const orangeTrafficLight2 = document.querySelector("#board-2 .orange-light");
const greenTrafficLight2 = document.querySelector("#board-2 .green-light");

const personIcon1 = document.querySelector("#board-1 .person-icon svg path");
const bikeIcon1 = document.querySelector("#board-1 .bike-icon svg path");
const personIcon2 = document.querySelector("#board-2 .person-icon svg path");
const bikeIcon2 = document.querySelector("#board-2 .bike-icon svg path");

const timer1 = document.querySelector("#board-1 .timer");
const timer2 = document.querySelector("#board-2 .timer");

const redLightColor = "#f44336";
const greenLightColor = "#64dd17";
const defaultLightColor = "#212121";

let isRunning = false;
let timeoutIds = [];

const longLightDuration = 15000;
const shortLightDuration = 1500;

const switchLights = () => {
  if (!isRunning) return;

  changeLight(greenTrafficLight1, true);
  changeLight(redTrafficLight2, true);

  changeColorIcon(personIcon1, greenLightColor);
  changeColorIcon(bikeIcon1, greenLightColor);
  changeColorIcon(personIcon2, redLightColor);
  changeColorIcon(bikeIcon2, redLightColor);

  timer1.style.color = greenLightColor;
  timer2.style.color = redLightColor;

  startTimer(timer1, timer2, longLightDuration);

  timeoutIds.push(
    setTimeout(() => {
      changeLight(greenTrafficLight1, false);
      changeLight(orangeTrafficLight1, true);
      changeLight(orangeTrafficLight2, true);

      changeColorIcon(personIcon1, redLightColor);
      changeColorIcon(bikeIcon1, redLightColor);

      timer1.style.color = redLightColor;
      timer2.style.color = redLightColor;

      timeoutIds.push(
        setTimeout(() => {
          changeLight(orangeTrafficLight1, false);
          changeLight(redTrafficLight1, true);

          timer1.style.color = redLightColor;
          timer2.style.color = greenLightColor;
          startTimer(timer1, timer2, longLightDuration);

          changeLight(orangeTrafficLight2, false);
          changeLight(redTrafficLight2, false);
          changeLight(greenTrafficLight2, true);

          changeColorIcon(personIcon2, greenLightColor);
          changeColorIcon(bikeIcon2, greenLightColor);

          timeoutIds.push(
            setTimeout(() => {
              changeLight(orangeTrafficLight1, true);
              changeLight(orangeTrafficLight2, true);
              changeLight(greenTrafficLight2, false);

              changeColorIcon(personIcon2, redLightColor);
              changeColorIcon(bikeIcon2, redLightColor);

              timer2.style.color = redLightColor;

              timeoutIds.push(
                setTimeout(() => {
                  changeLight(orangeTrafficLight1, false);
                  changeLight(orangeTrafficLight2, false);
                  changeLight(redTrafficLight1, false);

                  // Active to run infinite
                  switchLights();
                }, shortLightDuration)
              );
            }, longLightDuration)
          );
        }, shortLightDuration)
      );
    }, longLightDuration)
  );
};

const startTrafficLights = () => {
  if (!isRunning) {
    isRunning = true;
    switchLights();
  }
};

const stopTrafficLights = () => {
  isRunning = false;
  timeoutIds.forEach((id) => clearTimeout(id));
  timeoutIds = [];

  changeColorIcon(personIcon1, defaultLightColor);
  changeColorIcon(bikeIcon1, defaultLightColor);
  changeColorIcon(personIcon2, defaultLightColor);
  changeColorIcon(bikeIcon2, defaultLightColor);

  changeLight(greenTrafficLight1, false);
  changeLight(orangeTrafficLight1, false);
  changeLight(redTrafficLight1, false);
  changeLight(greenTrafficLight2, false);
  changeLight(orangeTrafficLight2, false);
  changeLight(redTrafficLight2, false);

  timer1.style.color = defaultLightColor;
  timer1.innerText = "--";
  timer2.style.color = defaultLightColor;
  timer2.innerText = "--";
  stopTimer();
};

export { startTrafficLights, stopTrafficLights };
