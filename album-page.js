const apiUrl =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";

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
      addAlbumInfo(albumData);
    })
    .catch((error) => {
      console.error("Si è verificato un errore:", error);
    });
}

// funzione per aggiornare l'album data(header)
function updateAlbumInfo(albumData) {
  document.getElementById("albumTitle").textContent = albumData.title;
  document.getElementById("albumImage").src = albumData.cover_medium;
  document.getElementById("profileImg").src = albumData.cover;
  document.getElementById(
    "albumInfo"
  ).textContent = `${albumData.artist.name} • ${albumData.release_date} • ${albumData.nb_tracks} Brani`;

  document.getElementById("albumDuration").textContent = `${formatDuration(
    albumData.duration
  )}`;
}

//funzione per aggiungere numero, canzone, riproduzioni, tempo

function addAlbumInfo(albumData) {
  const tracksContainer = document.getElementById("tracks");

  albumData.tracks.data.forEach((track, index) => {
    const trackElement = document.createElement("div");
    trackElement.classList.add("row", "track-element");

    // creo numero canzone
    const numberDiv = document.createElement("div");
    numberDiv.classList.add("col-1");

    const numberContent = document.createElement("div");
    const numberText = document.createElement("h5");

    //effetto hover + incremento numero per canzone

    const numberSpan = document.createElement("span");
    numberSpan.textContent = index + 1;
    numberSpan.classList.add("number-text");

    const iconSpan = document.createElement("i");
    iconSpan.classList.add("bi", "bi-play-fill", "icon-text");

    numberText.appendChild(numberSpan);
    numberText.appendChild(iconSpan);
    numberContent.appendChild(numberText);
    numberDiv.appendChild(numberContent);
    trackElement.appendChild(numberDiv);

    // creo titolo canzone
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("col-7");
    const titleContent = document.createElement("div");
    const titleText = document.createElement("h5");
    titleText.textContent = track.title;

    // creo nome artista

    const artistText = document.createElement("p");
    artistText.textContent = track.artist.name;
    titleContent.appendChild(titleText);
    titleContent.appendChild(artistText);
    titleDiv.appendChild(titleContent);
    trackElement.appendChild(titleDiv);

    // creo riproduzioni
    const playsDiv = document.createElement("div");
    playsDiv.classList.add("col-3");
    const playsContent = document.createElement("div");
    const playsText = document.createElement("h5");
    playsText.textContent = track.rank.toLocaleString();
    playsContent.appendChild(playsText);
    playsDiv.appendChild(playsContent);
    trackElement.appendChild(playsDiv);

    // creo tempo canzone
    const durationDiv = document.createElement("div");
    durationDiv.classList.add("col-1");
    const durationContent = document.createElement("div");
    const durationText = document.createElement("h5");
    durationText.textContent = formatDuration(track.duration);
    durationContent.appendChild(durationText);
    durationDiv.appendChild(durationContent);
    trackElement.appendChild(durationDiv);

    tracksContainer.appendChild(trackElement);
  });
}

//funzione per formattare durata canzone(adesso funziona)

function formatDuration(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

document.addEventListener("DOMContentLoaded", fetchAndDisplayAlbumInfo);
