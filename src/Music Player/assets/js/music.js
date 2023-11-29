import { musicList } from "./CONSTANTS.js";

let currentMusicIndex = 0;
let audioElement;
let buttonPlayer;
let duration;
let durationElement;
let isTouchDevice;
let isPlaying;
let runningTime;
let runningTimeElement;
let sliderElementWidth;

let albumElement;
let authorElement;
let titleElement;
let sliderElement;

let second = -1;

const musicLength = () => {
  return musicList.length;
};

const setPlayer = (audio, button) => {
  audioElement = audio;
  buttonPlayer = button;
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

  //   Toggle button class to show/hide play/pause svg
  buttonPlayer.classList.toggle("button--pause");
  if (isTouchDevice) buttonPlayer.classList.toggle("mobile-hover");
};

const stop = () => {
  buttonPlayer.classList.remove("button--pause");
  isPlaying = false;
};

const setSource = () => {
  audioElement.src = currentMusic().musicUrl;
};

const setRunningTime = (runningEl) => {
  runningTimeElement = runningEl;
  runningTime = audioElement.currentTime;
};

const setDuration = (durationEl) => {
  duration = audioElement.duration.toFixed(0);

  durationElement = durationEl;
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

const initializeMusicEvents = (
  audioPlayer,
  buttonPlayer,
  durationEl,
  runningEl
) => {
  const nextButton = document.querySelector(".button--next");
  const previousButton = document.querySelector(".button--previous");

  albumElement = document.querySelector(".card__image");
  titleElement = document.querySelector(".card__title");
  authorElement = document.querySelector(".card__author");
  sliderElement = document.querySelector(".progressbar__slider");
  sliderElementWidth = document.querySelector(".progressbar__container");

  document.addEventListener("DOMContentLoaded", () => {
    setPlayer(audioPlayer, buttonPlayer);
    setSource();

    audioPlayer.addEventListener("loadedmetadata", () => {
      setDuration(durationEl);
      setRunningTime(runningEl);
    });

    audioPlayer.addEventListener("timeupdate", (event) => {
      const currentSecond = event.target.currentTime.toFixed(0);
      if (currentSecond != second) {
        second = currentSecond;
        sliderElement.style.width =
          (sliderElementWidth.offsetWidth / duration) * second + "px";
        runningTimeElement.innerHTML = getTime(currentSecond);
      }
    });

    audioPlayer.addEventListener("ended", stop);

    nextButton.addEventListener("click", next);
    previousButton.addEventListener("click", previous);
    buttonPlayer.addEventListener("click", handlePlay);

    // Load music details

    setMusicDetails();

    // Set separate event listener on pause/play button for mobile
    // To fix :hover functioning as click on mobile

    const elements = [nextButton, previousButton, buttonPlayer];

    isTouchDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    console.log(isTouchDevice);

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

    buttonPlayer.addEventListener;
  });
};

export default initializeMusicEvents;
