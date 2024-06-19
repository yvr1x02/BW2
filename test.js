const apiUrl = "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";

function fetchAndDisplayAlbumInfo() {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nel recupero dei dati");
      }
      return response.json();
    })
    .then((albumData) => {
      updateAlbumInfo(albumData);
    })
    .catch((error) => {
      console.error("Si è verificato un errore:", error);
    });
}

function updateAlbumInfo(albumData) {
  document.getElementById("albumTitle").textContent = albumData.title;
  document.getElementById("albumImage").src = albumData.cover_medium;
  document.getElementById(
    "albumInfo"
  ).textContent = `${albumData.artist.name} • ${albumData.release_date} • ${albumData.nb_tracks} Brani`;

  document.getElementById("albumDuration").textContent = `${formatDuration(albumData.duration)}`;
}

/*non funziona :D

/*function formatDuration(durationInSeconds) {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;
 i
}*/

fetchAndDisplayAlbumInfo();
