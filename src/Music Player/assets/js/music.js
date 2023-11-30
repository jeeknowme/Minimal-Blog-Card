import { musicList } from "./CONSTANTS.js";

let currentMusicIndex = 0;

let duration;
let isTouchDevice;
let isPlaying;
let second = -1;

// Elements

let buttonPlayer;
let audio;
let album;
let author;
let title;
let durationTime;
let nextButton;
let previousButton;
let runningTime;
let slider;
let sliderParent;
let sliderThumb;

const musicLength = () => {
  return musicList.length;
};

const setup = () => {
  audio = document.getElementById("music");
  buttonPlayer = document.querySelector(".button--play");
  durationTime = document.querySelector(".duration__time");
  runningTime = document.querySelector(".running__time");
  nextButton = document.querySelector(".button--next");
  previousButton = document.querySelector(".button--previous");

  album = document.querySelector(".card__image");
  title = document.querySelector(".card__title");
  author = document.querySelector(".card__author");
  slider = document.querySelector(".progressbar__slider");
  sliderParent = document.querySelector(".progressbar__container");
  sliderThumb = document.getElementById("change__play");
};

const currentMusic = () => {
  return musicList[currentMusicIndex];
};

const currentAlbum = () => currentMusic().album;

const currentAuthor = () => currentMusic().author;

const currentTitle = () => currentMusic().title;

const play = () => {
  audio.play();
  isPlaying = true;
};

const pause = () => {
  audio.pause();
  isPlaying = false;
};

const next = () => {
  if (currentMusicIndex < musicLength() - 1) {
    currentMusicIndex++;
  }

  setMusicDetails();

  if (isPlaying) play();
};

const setRange = () => {
  sliderThumb.max = duration;
};

const previous = () => {
  if (currentMusicIndex > 0) {
    currentMusicIndex--;
  }

  setMusicDetails();

  if (isPlaying) play();
};

const setMusicDetails = () => {
  setAlbum();
  setAuthor();
  setTitle();
  setSource();
  setRange();
  resetTime();
};

const resetTime = () => {
  second = -1;
};

const setAlbum = () => {
  album.src = currentAlbum();
};

const setAuthor = () => {
  author.innerHTML = currentAuthor();
};

const setTitle = () => {
  title.innerHTML = currentTitle();
};

const setSource = () => {
  audio.src = currentMusic().musicUrl;
};

const handlePlay = () => {
  if (audio.paused) play();
  else pause();

  // Toggle button class to show/hide play/pause svg
  buttonPlayer.classList.toggle("button--pause");
  if (isTouchDevice) buttonPlayer.classList.toggle("mobile-hover");
};

const changePlay = ({ target: { value } }) => {
  updateTime(value);
  updateRunner();
  updateThumb();
};

const stop = () => {
  buttonPlayer.classList.remove("button--pause");
  isPlaying = false;
};

const setDuration = () => {
  duration = audio.duration.toFixed(0);
  durationTime.innerHTML = getTime(duration);
};

const getTime = (currentSecond) => {
  const runningSecond = currentSecond % 60;
  if (currentSecond > 59) {
    return String(Math.floor(currentSecond / 60)).concat(
      ":" + (runningSecond < 10 ? `0${runningSecond}` : runningSecond)
    );
  } else {
    if (runningSecond < 10) {
      return `0:0${currentSecond}`;
    } else return `0:${currentSecond}`;
  }
};

const updateTime = (changeTime) => {
  const currentSecond = getCurrentTime().toFixed(0);
  if (currentSecond !== second) {
    second = currentSecond;
  }
  if (changeTime) {
    second = changeTime;
    setCurrentTime();
  }
  updateRunningTime();
};

const setCurrentTime = () => {
  console.log(second);
  audio.currentTime = second;
};

const getCurrentTime = () => {
  return audio.currentTime;
};

// Update display of runtime
const updateRunningTime = () => {
  runningTime.innerHTML = getTime(second);
};

// Update progress bar
const updateRunner = () => {
  slider.style.width = (sliderParent.offsetWidth / duration) * second + "px";
};

// Update the thumb circle position
const updateThumb = () => {
  sliderThumb.value = second - 1;
};

const registerEventListener = () => {
  audio.addEventListener("loadedmetadata", () => {
    setDuration();
    setRange();
  });
  audio.addEventListener("ended", stop);
  nextButton.addEventListener("click", next);
  previousButton.addEventListener("click", previous);
  buttonPlayer.addEventListener("click", handlePlay);
  sliderThumb.addEventListener("change", changePlay);

  audio.addEventListener("timeupdate", () => {
    updateTime();
    updateRunner();
    updateThumb();
  });

  // Set separate event listener on pause/play button for mobile
  // To fix :hover functioning as click on mobile

  const elements = [nextButton, previousButton, buttonPlayer];

  isTouchDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isTouchDevice) {
    elements.forEach((element) => {
      element.addEventListener("mousedown", () => {
        element.classList.add("active");
      });

      element.addEventListener("mouseup", () => {
        element.classList.remove("active");
      });
    });
  } else {
    elements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        element.classList.add("hover");
      });

      element.addEventListener("mouseleave", () => {
        element.classList.remove("hover");
      });
    });
  }
};

const initializeMusicEvents = () => {
  document.addEventListener("DOMContentLoaded", () => {
    // Register elements
    setup();

    // Register event listeners
    registerEventListener();

    // Load music details
    setMusicDetails();
  });
};

export default initializeMusicEvents;
