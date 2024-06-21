const RandomId = () => {
  return Math.round(Math.random() * 100);
};

const id = RandomId();

const fetchArtist_banner = (artistId) => {
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
      if (data.data && data.data.length > 0) {
        const artist = data.data[0];
        updateBanner(artist);
      } else {
        console.warn(`Nessun artista trovato per l'ID: ${artistId}`);
      }
    })
    .catch((error) => {
      console.error("Errore durante la richiesta:", error);
      // Gestione più dettagliata degli errori qui, ad esempio mostrare un messaggio di errore all'utente
    });
};

const updateBanner = (artist) => {
  const albumImageCol = document.getElementById("albumImageCol");
  const artistDetailsCol = document.getElementById("artistDetailsCol");

  const albumImage = document.createElement("img");
  albumImage.src = artist.album.cover_medium;
  albumImage.classList.add("rounded-3");
  albumImage.style.maxWidth = "100%";
  albumImage.style.height = "auto";
  albumImageCol.appendChild(albumImage);

  const p = document.createElement("p");
  p.textContent = "ALBUM";
  p.classList.add("text-white");
  artistDetailsCol.appendChild(p);

  const albumName = document.createElement("p");
  albumName.textContent = artist.artist.name;
  albumName.classList.add("text-white");
  albumName.style.fontSize = "50px";
  artistDetailsCol.appendChild(albumName);

  const ads = document.createElement("p");
  ads.textContent = "Ascolta ora il tuo album preferito!";
  ads.classList.add("text-white");
  artistDetailsCol.appendChild(ads);

  const playButton = document.createElement("button");
  playButton.textContent = "Play";
  playButton.classList.add("bg-success", "rounded-pill", "px-3", "border-0");
  artistDetailsCol.appendChild(playButton);

  const saveButton = document.createElement("button");
  saveButton.textContent = "Salva";
  saveButton.classList.add("bg-dark", "rounded-pill", "px-3", "border-0", "ms-1");
  artistDetailsCol.appendChild(saveButton);
};

// Chiamata iniziale per ottenere un banner pubblicitario randomico
fetchArtist_banner(RandomId());
