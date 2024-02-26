import { startTrafficLights, stopTrafficLights } from "./switchLights.js";

const inputValue = document.querySelector("#time-value");
const error = document.querySelector("#error");
const btnStart = document.querySelector("#start");
const btnStop = document.querySelector("#stop");

let longLightDuration;

const toggleButtons = (
  statusButtonStar,
  statusButtonStop,
  statusInputValue
) => {
  btnStart.disabled = statusButtonStar;
  btnStop.disabled = statusButtonStop;
  inputValue.disabled = statusInputValue;
};

inputValue.addEventListener("keyup", (e) => {
  let valueDuration = e.target.value;

  if (
    valueDuration !== "" &&
    Number(valueDuration) >= 10 &&
    Number(valueDuration) <= 99
  ) {
    error.innerText = "";
    toggleButtons(false, true);
    longLightDuration = parseInt(valueDuration) * 1000;
    return;
  }

  if (valueDuration.charAt(0) === "0") {
    inputValue.value = "";
    return;
  }

  error.innerText = "Ingrese un valor válido";
  toggleButtons(true, true);
});

btnStart.addEventListener("click", () => {
  startTrafficLights(longLightDuration);
  toggleButtons(true, false, true);
});

btnStop.addEventListener("click", () => {
  stopTrafficLights();
  toggleButtons(true, true, false);
  inputValue.value = "";
});
