import initializeMusicEvents from "./music.js";

const audio = document.getElementById("music");
const buttonPlayer = document.querySelector(".button--play");
const durationSpan = document.querySelector(".playback__time");

initializeMusicEvents(audio, buttonPlayer, durationSpan);
