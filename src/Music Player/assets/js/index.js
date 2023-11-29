import initializeMusicEvents from "./music.js";

const audio = document.getElementById("music");
const buttonPlayer = document.querySelector(".button--play");
const durationSpan = document.querySelector(".playback__time");
const runningTime = document.querySelector(".running__time");

initializeMusicEvents(audio, buttonPlayer, durationSpan, runningTime);
