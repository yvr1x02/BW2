const rapidApiKey = "74b83fd89emsh70e15f203fee6dfp1aa455jsn0588b6257888";
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

const fetchSearchSong = (search) => {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${search}`;
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
      displayResults(data.data);
    })
    .catch((err) => console.log(err));
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
