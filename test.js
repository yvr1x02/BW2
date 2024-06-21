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
        _searchDisplayResults(data.data);
        return resp.json();
      } else {
        console.warn("Not Found");
      }
    })

    .catch((err) => console.log(err));
};

const _searchCreateCard = (artistData) => {
  const _searchCard = document.createElement("div");
  _searchCard.className = "card artist border-0 p-0 col-md-3 p-3";

  // Create a container for the image and the play icon
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container", "position-relative");

  const img = document.createElement("img");
  img.src = artistData.artist.picture_medium; // Adjusted to use artistData
  img.alt = artistData.artist.name; // Adjusted to use artistData
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
  name.textContent = artistData.artist.name; // Adjusted to use artistData
  name.classList.add("text-white", "p-1", "px-2", "mt-2", "mb-0");

  const type = document.createElement("p");
  type.textContent = "Artista";
  type.classList.add("text-secondary", "p-1", "px-2", "mt-1");

  // Add the image container and other elements to the card
  _searchCard.appendChild(imgContainer);
  _searchCard.appendChild(name);
  _searchCard.appendChild(type);

  _searchCardContainer.appendChild(_searchCard);
};

const _searchDisplayResults = (results) => {
  _searchSearchResults.innerHTML = ""; // Clear the field

  if (results && results.length > 0) {
    results.forEach((result) => {
      const card = document.createElement("div");
      card.className = "card";
      card.classList.add(
        "card",
        "albums",
        "border-0",
        "p-0",
        "col-md-3",
        "p-3"
      );

      // Create a container for the image and the play icon
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("img-container", "position-relative");

      const img = document.createElement("img");
      img.src = result.album.cover_big;
      img.alt = result.title;
      img.classList.add("card-img-top");

      // Create the play icon container and assign classes
      const iconContainer = document.createElement("div");
      iconContainer.classList.add("play-icon");
      iconContainer.id = "play-icon-albums";

      // Create the play icon and assign classes
      const playIcon = document.createElement("i");
      playIcon.classList.add("fas", "fa-play");

      // Add the play icon to the icon container
      iconContainer.appendChild(playIcon);

      // Add the image and play icon to the image container
      imgContainer.appendChild(img);
      imgContainer.appendChild(iconContainer);

      const name = document.createElement("h5");
      name.textContent = result.title;
      name.classList.add("text-white", "p-1", "px-2", "mt-2", "mb-0");

      const artist = document.createElement("p");
      artist.textContent = result.artist.name;
      artist.classList.add("text-secondary", "p-1", "px-2", "mt-1");

      // Add the image container and other elements to the card
      card.appendChild(imgContainer);
      card.appendChild(name);
      card.appendChild(artist);

      _searchSearchResults.appendChild(card);

      card.addEventListener("click", () => {
        window.location.href = `album-page.html?albumId=${result.album.id}`;
      });
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
  _searchFetchSearchSong(query);
});
