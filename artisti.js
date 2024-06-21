const cardContainer = document.getElementById("artistContainer");

// Funzione per generare un ID casuale tra 1 e 100
const generateRandomId = () => {
  return Math.round(Math.random() * 100);
};

// Genera un array di 5 ID casuali
const searchQueries = [];
for (let i = 0; i < 7; i++) {
  searchQueries.push(generateRandomId());
}

const fetchArtist = (artistId) => {
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
        createCard_artist(artist);
      } else {
        console.warn(`No artist found for ID: ${artistId}`);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      // Gestione degli errori più dettagliata qui, es. mostrare un messaggio di errore all'utente
    });
};

const createCard_artist = (artist) => {
  const card = document.createElement("div");
  card.className = "card artist border-0 p-0 col-md-3 p-3";

  // Create a container for the image and the play icon
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container", "position-relative");

  const img = document.createElement("img");
  img.src = artist.artist.picture_medium;
  img.alt = artist.name;
  img.classList.add("card-img-top", "rounded-circle");

  // Create the play icon container and assign classes
  const iconContainer = document.createElement("div");
  iconContainer.classList.add("play-icon");
  iconContainer.id = "play-icon-artist";

  // Create the play icon and assign classes
  const playIcon = document.createElement("i");
  playIcon.classList.add("fas", "fa-play");

  // Add the play icon to the icon container
  iconContainer.appendChild(playIcon);

  // Add the image and play icon container to the image container
  imgContainer.appendChild(img);
  imgContainer.appendChild(iconContainer);

  const name = document.createElement("h5");
  name.textContent = artist.artist.name;
  name.classList.add("text-white", "p-1", "px-2", "mt-2", "mb-0");

  const type = document.createElement("p");
  type.textContent = "Artista";
  type.classList.add("text-secondary", "p-1", "px-2", "mt-1");

  // Add the image container and other elements to the card
  card.appendChild(imgContainer);
  card.appendChild(name);
  card.appendChild(type);

  cardContainer.appendChild(card);
};

// Chiamate API per ogni ID casuale generato
searchQueries.forEach((id) => {
  fetchArtist(id);
});
