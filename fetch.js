const SONG_URL = "";
const API_KEY = "";

const fetchSong = () => {
  fetch(SONG_URL, {
    headers: {
      Authorization: API_KEY,
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nel rieprimento dei dati");
      }
    })
    .then((songs) => {})
    .catch((err) => console.log(err));
};
