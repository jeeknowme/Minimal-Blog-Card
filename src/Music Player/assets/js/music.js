const path = location.pathname.replace("/index.html", "") + "/assets/";

const musicList = [
  {
    title: "Forest Lullaby",
    author: "Lesfm",
    musicUrl: "music/forest-lullaby-110624.mp3",
    album: "images/cover-1.png",
  },
  {
    title: "Lost in the City lights",
    author: "Cosmo Sheldrake",
    musicUrl: "music/lost-in-city-lights-145038.mp3",
    album: "images/cover-2.png",
  },
].map((music) => {
  return {
    ...music,
    musicUrl: path + music.musicUrl,
    album: path + music.album,
  };
});

let currentMusicIndex = 0;
let audioElement;
let buttonPlayer;
let duration;
let durationElement;
let isTouchDevice;
let isPlaying;
let runningTime;
let runningTimeElement;

let albumElement;
let authorElement;
let titleElement;

const musicLength = () => {
  return musicList.length;
};

const firstMusic = () => musicList[0].musicUrl;

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

const setSource = () => {
  audioElement.src = currentMusic().musicUrl;
};

const setRunningTime = (runningEl) => {
  runningTimeElement = runningEl;
  runningTime = audioElement.currentTime;
};

const setDuration = (durationEl) => {
  duration = audioElement.duration;
  durationElement = durationEl;
  durationElement.innerHTML = (duration / 60)
    .toFixed(2)
    .replace(".", ":")
    .split(":")
    .map((n) => {
      return n.length === 1 ? "0" + n : n;
    })
    .join(":");
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

  document.addEventListener("DOMContentLoaded", () => {
    setPlayer(audioPlayer, buttonPlayer);
    setSource();

    audioPlayer.addEventListener("loadedmetadata", () => {
      setDuration(durationEl);
      setRunningTime(runningEl);
    });

    nextButton.addEventListener("click", next);
    previousButton.addEventListener("click", previous);
    buttonPlayer.addEventListener("click", handlePlay);

    // Load music details

    setMusicDetails();

    // Set separate event listener on pause/play button for mobile
    // To fix :hover functioning as click on mobile

    const elements = [nextButton, previousButton, buttonPlayer];

    isTouchDevice =
      "ontouchstart" in document.documentElement ||
      navigator.maxTouchPoints > 0 ||
      navigator.maxTouchPoints > 0;

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
