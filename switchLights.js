import changeLight from "./changeLight.js";

const redTrafficLight1 = document.querySelector("#board-1 .red-light");
const orangeTrafficLight1 = document.querySelector("#board-1 .orange-light");
const greenTrafficLight1 = document.querySelector("#board-1 .green-light");
const redTrafficLight2 = document.querySelector("#board-2 .red-light");
const orangeTrafficLight2 = document.querySelector("#board-2 .orange-light");
const greenTrafficLight2 = document.querySelector("#board-2 .green-light");

let isRunning = false;
let timeoutIds = [];

const longLightDuration = 4000;
const shortLightDuration = 1000;

const switchLights = () => {
  if (!isRunning) return;

  changeLight(greenTrafficLight1, true);
  changeLight(redTrafficLight2, true);

  timeoutIds.push(
    setTimeout(() => {
      changeLight(greenTrafficLight1, false);
      changeLight(orangeTrafficLight1, true);

      changeLight(orangeTrafficLight2, true);

      timeoutIds.push(
        setTimeout(() => {
          changeLight(orangeTrafficLight1, false);
          changeLight(redTrafficLight1, true);

          changeLight(orangeTrafficLight2, false);
          changeLight(redTrafficLight2, false);
          changeLight(greenTrafficLight2, true);

          timeoutIds.push(
            setTimeout(() => {
              changeLight(orangeTrafficLight1, true);
              changeLight(orangeTrafficLight2, true);
              changeLight(greenTrafficLight2, false);

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
};

export { startTrafficLights, stopTrafficLights };
