const cardContainer = document.getElementById("artistContainer");
const rapidApiKey = "27fdeed2bemsh4674e94f841d323p13c465jsnf69f30e4be65"; // Sostituisci con la tua chiave API

const searchQueries = ["eminem", "taylor swift", "drake", "rihanna", "coldplay", "gorillaz"]; // Aggiungi altri termini di ricerca

const fetchArtist = (artist) => {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artist}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Log dettagliato della risposta
      if (data.data && data.data.length > 0) {
        const artist = data.data[0];
        createCard(artist);
      } else {
        console.warn(`No artist found for query: ${artist}`);
      }
    })
    .catch((error) => console.error("Error:", error));
};

const createCard = (artist) => {
  const card = document.createElement("div");
  card.className = "card";
  card.classList.add("card", "albums", "border-0", "p-0", "col-md-3", "p-3");

  const img = document.createElement("img");
  img.src = artist.artist.picture_medium;
  img.alt = artist.name;
  img.classList.add("card-img-top", "rounded-circle");

  const name = document.createElement("h5");
  name.textContent = artist.artist.name;
  name.classList.add("text-white", "p-1", "px-2", "mt-2", "mb-0");

  const type = document.createElement("p");
  type.textContent = "Artista";
  type.classList.add("text-secondary", "p-1", "px-2", "mt-1");

  const div = document.createElement("div");
  const iconContainer = document.createElement("div");
  iconContainer.classList.add("play-icon");
  const playIcon = document.createElement("i");
  playIcon.classList.add("fas", "fa-play");

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(type);
  iconContainer.appendChild(playIcon);
  div.appendChild(iconContainer);
  card.appendChild(div);

  cardContainer.appendChild(card);
};

// Chiamate API per ogni artist di ricerca
searchQueries.forEach((artist) => {
  fetchArtist(artist);
});
