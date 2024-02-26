import { changeLight, changeColorIcon } from "./changeLight.js";
import { startTimer, stopTimer } from "./timer.js";

const redLights = document.querySelectorAll(".red-light");
const orangeLights = document.querySelectorAll(".orange-light");
const greenLights = document.querySelectorAll(".green-light");
const personIcons = document.querySelectorAll(".person-icon svg path");
const bikeIcons = document.querySelectorAll(".bike-icon svg path");
const timers = document.querySelectorAll(".timer");

const redLightColor = "#f44336";
const greenLightColor = "#64dd17";
const defaultLightColor = "#212121";

const shortLightDuration = 1500;

let isRunning = false;
let timeoutIds = [];

const switchLights = (longLightDuration) => {
  if (!isRunning) return;

  changeLight(greenLights[0], true);
  changeLight(redLights[1], true);

  startTimer(timers[0], timers[1], longLightDuration);
  timers[0].style.color = greenLightColor;
  timers[1].style.color = redLightColor;

  changeColorIcon(personIcons[0], greenLightColor);
  changeColorIcon(bikeIcons[0], greenLightColor);
  changeColorIcon(personIcons[1], redLightColor);
  changeColorIcon(bikeIcons[1], redLightColor);

  timeoutIds.push(
    setTimeout(() => {
      changeLight(greenLights[0], false);
      changeLight(orangeLights[0], true);
      changeLight(orangeLights[1], true);

      timers[0].style.color = redLightColor;
      timers[1].style.color = redLightColor;

      personIcons.forEach((icon) => changeColorIcon(icon, redLightColor));
      bikeIcons.forEach((icon) => changeColorIcon(icon, redLightColor));

      timeoutIds.push(
        setTimeout(() => {
          changeLight(orangeLights[0], false);
          changeLight(redLights[0], true);

          changeLight(orangeLights[1], false);
          changeLight(redLights[1], false);
          changeLight(greenLights[1], true);

          startTimer(timers[0], timers[1], longLightDuration);
          timers[0].style.color = redLightColor;
          timers[1].style.color = greenLightColor;

          changeColorIcon(personIcons[1], greenLightColor);
          changeColorIcon(bikeIcons[1], greenLightColor);

          timeoutIds.push(
            setTimeout(() => {
              changeLight(orangeLights[0], true);
              changeLight(orangeLights[1], true);
              changeLight(greenLights[1], false);

              timers[1].style.color = redLightColor;
              changeColorIcon(personIcons[1], redLightColor);
              changeColorIcon(bikeIcons[1], redLightColor);

              timeoutIds.push(
                setTimeout(() => {
                  changeLight(orangeLights[0], false);
                  changeLight(orangeLights[1], false);
                  changeLight(redLights[0], false);

                  switchLights(longLightDuration);
                }, shortLightDuration)
              );
            }, longLightDuration)
          );
        }, shortLightDuration)
      );
    }, longLightDuration)
  );
};

const startTrafficLights = (longLightDuration) => {
  if (!isRunning) {
    isRunning = true;
    switchLights(longLightDuration);
  }
};

const stopTrafficLights = () => {
  isRunning = false;
  timeoutIds.forEach((id) => clearTimeout(id));
  timeoutIds = [];

  personIcons.forEach((icon) => changeColorIcon(icon, defaultLightColor));
  bikeIcons.forEach((icon) => changeColorIcon(icon, defaultLightColor));

  redLights.forEach((light) => changeLight(light, false));
  orangeLights.forEach((light) => changeLight(light, false));
  greenLights.forEach((light) => changeLight(light, false));

  timers.forEach((timer) => {
    timer.style.color = defaultLightColor;
    timer.innerText = "--";
  });

  stopTimer();
};

export { startTrafficLights, stopTrafficLights };
