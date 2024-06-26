const cardContainer = document.getElementById("banner-search");
const rapidApiKey = "74b83fd89emsh70e15f203fee6dfp1aa455jsn0588b6257888";

const searchQueries = ["eminem", "taylor swift", "drake", "rihanna", "coldplay", "gorillaz"];

const generateRandomId = () => {
  return Math.round(Math.random() * 100);
};
console.log(generateRandomId());

console.log(searchQueries);

const fetchSearchSong = (search) => {
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
        console.log(resp);
        return resp.json();
      } else {
        throw new Error("Errore nel rieprimento dei dati");
      }
    })
    .then((data) => {
      console.log(data);
      if (data.data && data.data.length > 0) {
        const artist = data.data[0].artist.name;
        const album = data.data[0].album.title;
        console.log(artist);
        console.log(album);
        createCard(nameSearchValue);
      } else {
        console.warn("Not Found");
      }
    })
    .catch((err) => console.log(err));
};

const createCard = () => {
  const card = document.createElement("div");
  card.className = "card";
  card.classList.add("card", "albums", "border-0", "p-0", "col-md-3", "p-3");

  const nameSearchValue = getElementById("cerca-canzone").value;

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

function updateInfos(searchObj) {}

function addInfos(searchObj) {}

window.addEventListener("DOMContentLoaded", fetchSearchSong);
