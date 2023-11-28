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
  document.addEventListener("DOMContentLoaded", () => {
    setPlayer(audioPlayer, buttonPlayer);
    setSource();
    buttonPlayer.addEventListener("click", handlePlay);

    setTimeout(() => {
      setDuration(durationEl);
    }, 150);
  });
};

export default initializeMusicEvents;
