const cardContainer = document.getElementById("banner-search");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const rapidApiKey = "74b83fd89emsh70e15f203fee6dfp1aa455jsn0588b6257888";

const searchQueries = ["eminem", "taylor swift", "drake", "rihanna", "coldplay", "gorillaz"];

const generateRandomId = () => {
  return Math.round(Math.random() * 100);
};
console.log(generateRandomId());

console.log(searchQueries);

const fetchSearchSong = (search) => {
  const nameSearchValue = search;
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${nameSearchValue}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": rapidApiKey,
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nel rieprimento dei dati");
      }
    })
    .then((data) => {
      console.log(data);
      if (data.data && data.data.length > 0) {
        const artistData = data.data[0];
        createCard(artistData);
      } else {
        console.warn("Not Found");
      }
    })
    .catch((err) => console.log(err));
};

const createCard = (artistData) => {
  const card = document.createElement("div");
  card.className = "card";
  card.classList.add("card", "albums", "border-0", "p-0", "col-md-3", "p-3");

  const img = document.createElement("img");
  img.src = artistData.album.cover_medium;
  img.alt = artistData.artist.name;
  img.classList.add("card-img-top", "rounded-circle");

  const name = document.createElement("h5");
  name.textContent = artistData.artist.name;
  name.classList.add("text-white", "p-1", "px-2", "mt-2", "mb-0");

  const type = document.createElement("p");
  type.textContent = "Artista";
  type.classList.add("text-secondary", "p-1", "px-2", "mt-1");

  const div = document.createElement("div");
  const iconContainer = document.createElement("div");
  iconContainer.classList.add("play-icon");
  const playIcon = document.createElement("i");
  playIcon.classList.add("fas", "fa-play");

  iconContainer.appendChild(playIcon);
  div.appendChild(iconContainer);

  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(type);
  card.appendChild(div);

  cardContainer.appendChild(card);
};
const displayResults = (results) => {
  searchResults.innerHTML = ""; // Ripulisce il campo
  if (results && results.length > 0) {
    results.forEach((result) => {
      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = result.album.cover_medium;
      img.alt = result.artist.name;

      const name = document.createElement("h5");
      name.textContent = result.artist.name;

      const album = document.createElement("p");
      album.textContent = result.album.title;

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(album);

      searchResults.appendChild(card);
    });
  } else {
    const noResults = document.createElement("p");
    noResults.textContent = "No results found";
    searchResults.appendChild(noResults);
  }
};

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      fetchSearchSong(query);
    }
  }
});

window.addEventListener("DOMContentLoaded", () => {
  searchQueries.forEach((query) => {
    fetchSearchSong(query);
  });
});
