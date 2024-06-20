const SONG_URL = "https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem";

const fetchSearchSong = () => {
  fetch(SONG_URL)
    .then((resp) => {
      if (resp.ok) {
        console.log(resp);
        return resp.json();
      } else {
        throw new Error("Errore nel rieprimento dei dati");
      }
    })
    .then((searchObj) => {
      updateInfos();
      addInfos();
    })
    .catch((err) => console.log(err));
};

function updateInfos(searchObj) {
  const input = document.getElementById("cerca-canzone").value;
}

function addInfos(searchObj) {}

window.addEventListener("DOMContentLoaded", fetchSearchSong);
