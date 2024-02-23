import { startTrafficLights, stopTrafficLights } from "./switchLights.js";

const btnStart = document.querySelector("#start");
const btnStop = document.querySelector("#stop");

const toggleButtons = (statusButtonStar, statusButtonStop) => {
  btnStart.disabled = statusButtonStar;
  btnStop.disabled = statusButtonStop;
};

btnStart.addEventListener("click", () => {
  startTrafficLights();
  toggleButtons(true, false);
});

btnStop.addEventListener("click", () => {
  stopTrafficLights();
  toggleButtons(false, true);
});
