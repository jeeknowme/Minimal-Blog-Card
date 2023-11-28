const path = location.pathname.replace("/index.html", "") + "/assets/music/";

const musicList = [
  {
    title: "Lost in the City lights",
    author: "Cosmo Sheldrake",
    musicUrl: "forest-lullaby-110624.mp3",
  },
  {
    title: "Lost in the City lights",
    author: "Cosmo Sheldrake",
    musicUrl: "lost-in-city-lights-145038.mp3",
  },
].map((music) => {
  return {
    ...music,
    musicUrl: path + music.musicUrl,
  };
});

let currentMusicIndex;
let audioElement;
let buttonPlayer;
let duration;
let durationElement;
let isTouchDevice;

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

const play = () => {
  audioElement.play();
};

const pause = () => {
  audioElement.pause();
};

const next = () => {
  if (currentMusicIndex < musicLength() - 1) {
    currentMusicIndex++;
  }
};

const previous = () => {
  if (currentMusicIndex > 0) {
    currentMusicIndex++;
  }
};

const handlePlay = () => {
  if (audioElement.paused) play();
  else pause();
  //   Toggle button class to show/hide play/pause svg

  buttonPlayer.classList.toggle("button--pause");
  if (isTouchDevice) buttonPlayer.classList.toggle("mobile-hover");
};

const setSource = (source = firstMusic()) => {
  audioElement.src = source;
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

const initializeMusicEvents = (audioPlayer, buttonPlayer, durationEl) => {
  const nextButton = document.querySelector(".button--next");
  const previousButton = document.querySelector(".button--previous");

  document.addEventListener("DOMContentLoaded", () => {
    setPlayer(audioPlayer, buttonPlayer);
    setSource();

    audioPlayer.addEventListener("loadedmetadata", () =>
      setDuration(durationEl)
    );

    buttonPlayer.addEventListener("click", handlePlay);

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
