const _searchCardContainer = document.getElementById("banner-search");
const _searchSearchInput = document.getElementById("search-input");
const _searchSearchResults = document.getElementById("search-results");
const _searchRapidApiKey = "74b83fd89emsh70e15f203fee6dfp1aa455jsn0588b6257888";

const _searchSearchQueries = [
  "eminem",
  "taylor swift",
  "drake",
  "rihanna",
  "coldplay",
  "gorillaz",
];

const _searchGenerateRandomId = () => {
  return Math.round(Math.random() * 100);
};
console.log(_searchGenerateRandomId());

console.log(_searchSearchQueries);

const _searchFetchSearchSong = (search) => {
  const _searchNameSearchValue = search;
  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${_searchNameSearchValue}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": _searchRapidApiKey,
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
        _searchCreateCard(artistData);
        return resp.json();
      } else {
        console.warn("Not Found");
      }
    })
    .then((data) => {
      _searchDisplayResults(data.data);
    })
    .catch((err) => console.log(err));
};

const _searchCreateCard = (artistData) => {
  const _searchCard = document.createElement("div");
  _searchCard.className = "card";
  _searchCard.classList.add(
    "card",
    "albums",
    "border-0",
    "p-0",
    "col-md-3",
    "p-3"
  );

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
  const _searchIconContainer = document.createElement("div");
  _searchIconContainer.classList.add("play-icon");
  const _searchPlayIcon = document.createElement("i");
  _searchPlayIcon.classList.add("fas", "fa-play");

  _searchIconContainer.appendChild(_searchPlayIcon);
  div.appendChild(_searchIconContainer);

  _searchCard.appendChild(img);
  _searchCard.appendChild(name);
  _searchCard.appendChild(type);
  _searchCard.appendChild(div);

  _searchCardContainer.appendChild(_searchCard);
};

const _searchDisplayResults = (results) => {
  if (results && results.length > 0) {
    results.forEach((result) => {
      const _searchCard = document.createElement("div");
      _searchCard.className = "card";

      const img = document.createElement("img");
      img.src = result.album.cover_medium;
      img.alt = result.artist.name;

      const name = document.createElement("h5");
      name.textContent = result.artist.name;

      const album = document.createElement("p");
      album.textContent = result.album.title;

      _searchCard.appendChild(img);
      _searchCard.appendChild(name);
      _searchCard.appendChild(album);

      _searchSearchResults.appendChild(_searchCard);
    });
  } else {
    const _searchNoResults = document.createElement("p");
    _searchNoResults.textContent = "No results found";
    _searchSearchResults.appendChild(_searchNoResults);
  }
};

_searchSearchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = _searchSearchInput.value.trim();

    if (query) {
      _searchFetchSearchSong(query);
    }
  }
});

window.addEventListener("DOMContentLoaded", () => {
  _searchSearchQueries.forEach((query) => {
    _searchFetchSearchSong(query);
  });
});
