const path = location.pathname.replace("/index.html", "") + "/assets/";

export const musicList = [
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
