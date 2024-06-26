const _song_cardContainer = document.getElementById("songsContainer");

// Funzione per generare un ID casuale tra 1 e 100
const _song_generateRandomId = () => {
  return Math.round(Math.random() * 100);
};

// Genera un array di 5 ID casuali
const _song_searchQueries = [];
for (let i = 0; i < 7; i++) {
  _song_searchQueries.push(_song_generateRandomId());
}

const _song_fetchArtist = (artistId) => {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artistId}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Log dettagliato della risposta
      if (data.data && data.data.length > 0) {
        const artist = data.data[0];
        _song_createCard(artist);
      } else {
        console.warn(`No artist found for ID: ${artistId}`);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      // Gestione degli errori più dettagliata qui, es. mostrare un messaggio di errore all'utente
    });
};

const _song_createCard = (artist) => {
  const card = document.createElement("div");
  card.className = "card";
  card.classList.add("card", "songs", "border-0", "p-0", "col-md-3", "p-3");

  // Create a container for the image and the play icon
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container", "position-relative");

  const img = document.createElement("img");
  img.src = artist.artist.picture_big;
  img.alt = artist.name;
  img.classList.add("card-img-top");

  // Create the play icon container and assign classes
  const iconContainer = document.createElement("div");
  iconContainer.classList.add("play-icon");
  iconContainer.id = "play-icon-songs";

  // Create the play icon and assign classes
  const playIcon = document.createElement("i");
  playIcon.classList.add("fas", "fa-play");

  // Add the play icon to the icon container
  iconContainer.appendChild(playIcon);
  // Add the image and play icon to the image container
  imgContainer.appendChild(img);
  imgContainer.appendChild(iconContainer);

  const name = document.createElement("h5");
  name.textContent = artist.title;
  name.classList.add(
    "text-white",
    "p-1",
    "px-2",
    "mt-2",
    "mb-0",
    "text-truncate"
  );

  const nameArtist = document.createElement("p");
  nameArtist.textContent = artist.artist.name;
  nameArtist.classList.add("text-secondary", "p-1", "px-2", "mt-1", "mb-0");

  const type = document.createElement("p");
  type.textContent = "Singolo";
  type.classList.add("text-secondary", "p-1", "px-2");

  // Add the image container and other elements to the card
  card.appendChild(imgContainer);
  card.appendChild(name);
  card.appendChild(nameArtist);
  card.appendChild(type);

  _song_cardContainer.appendChild(card);
};
// Chiamate API per ogni ID casuale generato
_song_searchQueries.forEach((id) => {
  _song_fetchArtist(id);
});
