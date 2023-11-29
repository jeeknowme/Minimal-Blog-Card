import { musicList } from "./CONSTANTS.js";

let currentMusicIndex = 0;

let duration;
let isTouchDevice;
let isPlaying;

let buttonPlayer;
let audioElement;
let albumElement;
let authorElement;
let titleElement;

let second = -1;

const musicLength = () => {
  return musicList.length;
};

const setMusicPlayer = (audio, button, album, author, title) => {
  audioElement = audio;
  buttonPlayer = button;
  albumElement = album;
  authorElement = author;
  titleElement = title;
};

const currentMusic = () => {
  return musicList[currentMusicIndex];
};

const currentAlbum = () => {
  return currentMusic().album;
};

const currentAuthor = () => {
  return currentMusic().author;
};

const currentTitle = () => {
  return currentMusic().title;
};

const play = () => {
  audioElement.play();
  isPlaying = true;
};

const pause = () => {
  audioElement.pause();
  isPlaying = false;
};

const next = () => {
  if (currentMusicIndex < musicLength() - 1) {
    currentMusicIndex++;
  }

  setMusicDetails();

  if (isPlaying) play();
};

const setMusicDetails = () => {
  setAlbum();
  setAuthor();
  setTitle();
  setSource();
};

const setAlbum = () => {
  albumElement.src = currentAlbum();
};

const setAuthor = () => {
  authorElement.innerHTML = currentAuthor();
};

const setTitle = () => {
  titleElement.innerHTML = currentTitle();
};

const setSource = () => {
  audioElement.src = currentMusic().musicUrl;
};

const previous = () => {
  if (currentMusicIndex > 0) {
    currentMusicIndex--;
  }

  setMusicDetails();

  if (isPlaying) play();
};

const handlePlay = () => {
  if (audioElement.paused) play();
  else pause();

  // Toggle button class to show/hide play/pause svg
  buttonPlayer.classList.toggle("button--pause");
  if (isTouchDevice) buttonPlayer.classList.toggle("mobile-hover");
};

const stop = () => {
  buttonPlayer.classList.remove("button--pause");
  isPlaying = false;
};

const setDuration = (durationElement) => {
  duration = audioElement.duration.toFixed(0);
  durationElement.innerHTML = getTime(duration);
};

const getTime = (currentSecond) => {
  const second = currentSecond % 60;
  if (currentSecond > 59) {
    return (currentSecond / 60)
      .toFixed(0)
      .concat(":" + (second < 10 ? `0${second}` : second));
  } else {
    if (second < 10) {
      return `0:0${currentSecond}`;
    } else return `0:${currentSecond}`;
  }
};

const initializeEventListener = () => {
  const audioPlayer = document.getElementById("music");
  const buttonPlayer = document.querySelector(".button--play");
  const durationTime = document.querySelector(".duration__time");
  const runningTime = document.querySelector(".running__time");
  const nextButton = document.querySelector(".button--next");
  const previousButton = document.querySelector(".button--previous");

  const album = document.querySelector(".card__image");
  const title = document.querySelector(".card__title");
  const author = document.querySelector(".card__author");
  const slider = document.querySelector(".progressbar__slider");
  const sliderParent = document.querySelector(".progressbar__container");

  audioPlayer.addEventListener("ended", stop);
  nextButton.addEventListener("click", next);
  previousButton.addEventListener("click", previous);
  buttonPlayer.addEventListener("click", handlePlay);

  setMusicPlayer(audioPlayer, buttonPlayer, album, author, title);

  audioPlayer.addEventListener("loadedmetadata", () => {
    setDuration(durationTime);
  });

  audioPlayer.addEventListener("timeupdate", (event) => {
    const currentSecond = event.target.currentTime.toFixed(0);
    if (currentSecond != second) {
      second = currentSecond;
      slider.style.width =
        (sliderParent.offsetWidth / duration) * second + "px";
      runningTime.innerHTML = getTime(currentSecond);
    }
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
    // Register event listeners
    initializeEventListener();
    // Load music details
    setMusicDetails();
  });
};

export default initializeMusicEvents;
