import { startTrafficLights, stopTrafficLights } from "./switchLights.js";

const btnStart = document.querySelector("#start");
const btnStop = document.querySelector("#stop");

btnStart.addEventListener("click", startTrafficLights);
btnStop.addEventListener("click", stopTrafficLights);
