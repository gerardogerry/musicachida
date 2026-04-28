import { MusicAPI } from './api.js';
import { Player } from './player.js';
import { UI } from './ui.js';

const api = new MusicAPI();
const player = new Player();
const ui = new UI(document.getElementById("results"));

const loader = document.getElementById("loader");
const genreMenu = document.getElementById("genreMenu");
const artistList = document.getElementById("artistList");
const selectedGenreText = document.getElementById("selectedGenre");
const searchInput = document.getElementById("searchArtist");

// 🎯 VISTAS
const artistView = document.getElementById("artistView");
const songView = document.getElementById("songView");
const backBtn = document.getElementById("backBtn");
const emptyState = document.getElementById("emptyState");

let currentArtists = [];

// 🎧 GÉNEROS (~200 artistas)
const genres = {
    "Rock": ["Metallica","Nirvana","Radiohead","Coldplay","Arctic Monkeys","Linkin Park","Foo Fighters","Green Day","Queen","The Beatles","Rolling Stones","Pink Floyd","AC/DC","Red Hot Chili Peppers","Muse","The Killers","Oasis","Bon Jovi","Paramore","My Chemical Romance"],
    
    "Pop": ["Taylor Swift","Dua Lipa","Billie Eilish","The Weeknd","Ariana Grande","Justin Bieber","Ed Sheeran","Harry Styles","Katy Perry","Shawn Mendes","Olivia Rodrigo","Lady Gaga","Bruno Mars","Sia","Sam Smith","Rihanna","Maroon 5","Halsey","Camila Cabello","Charlie Puth"],

    "Hip-Hop": ["Drake","Kendrick Lamar","Eminem","Travis Scott","J. Cole","21 Savage","Lil Baby","Future","Post Malone","Tyler The Creator","ASAP Rocky","Nicki Minaj","Cardi B","Jay-Z","Kanye West","Doja Cat","Juice WRLD","Pop Smoke","Ice Cube","50 Cent"],

    "Reggaeton": ["Bad Bunny","Karol G","Feid","Rauw Alejandro","J Balvin","Daddy Yankee","Ozuna","Anuel AA","Myke Towers","Nicky Jam","Wisin","Yandel","Sech","Zion","Arcangel","De La Ghetto","Chencho Corleone","Eladio Carrion","Brytiago","Plan B"],

    "Electrónica": ["Daft Punk","Calvin Harris","Marshmello","Avicii","David Guetta","Skrillex","Deadmau5","Martin Garrix","Tiesto","Armin van Buuren","Zedd","Kygo","Alan Walker","Diplo","Major Lazer","Disclosure","Flume","Porter Robinson","Eric Prydz","Swedish House Mafia"],

    "Regional Mexicano": ["Peso Pluma","Natanael Cano","Junior H","Fuerza Regida","Grupo Frontera","Carin Leon","Marca MP","Eslabon Armado","Los Tigres del Norte","Los Tucanes de Tijuana","Banda MS","Calibre 50","Julion Alvarez","Gerardo Ortiz","Luis R Conriquez","Remmy Valenzuela","Edicion Especial","Grupo Firme","Panter Belico","T3R Elemento"]
};

// 🔥 TODOS LOS ARTISTAS (para búsqueda global)
const allArtists = Object.values(genres).flat();

// 🎵 MENÚ DE GÉNEROS
Object.keys(genres).forEach(genre => {

    const li = document.createElement("li");
    li.innerHTML = `<a class="dropdown-item">${genre}</a>`;

    li.addEventListener("click", () => {

        currentArtists = genres[genre];

        searchInput.value = "";
        searchInput.disabled = false;

        selectedGenreText.textContent = `Género: ${genre}`;

        emptyState.classList.add("d-none");

        showArtists(currentArtists);
    });

    genreMenu.appendChild(li);
});

// 🎤 MOSTRAR ARTISTAS
function showArtists(list) {

    artistView.classList.remove("d-none");
    songView.classList.add("d-none");
    backBtn.classList.add("d-none");

    artistList.innerHTML = "";

    list.forEach(artist => {

        const div = document.createElement("div");
        div.className = "col-md-3 col-sm-6 mb-3";

        div.innerHTML = `
            <div class="card artist-card p-3 text-center">
                <h5>${artist}</h5>
                <button class="btn btn-info mt-2">Ver canciones</button>
            </div>
        `;

        div.querySelector("button").addEventListener("click", async () => {

            // 🔄 CAMBIO DE VISTA
            artistView.classList.add("d-none");
            songView.classList.remove("d-none");
            backBtn.classList.remove("d-none");

            loader.classList.remove("d-none");

            const songs = await api.getSongs(artist);

            loader.classList.add("d-none");

            ui.renderSongs(songs, player);
        });

        artistList.appendChild(div);
    });
}

// 🔙 BOTÓN VOLVER
backBtn.addEventListener("click", () => {

    songView.classList.add("d-none");
    artistView.classList.remove("d-none");
    backBtn.classList.add("d-none");

});

// 🔍 BUSCADOR GLOBAL
searchInput.addEventListener("input", () => {

    const text = searchInput.value.toLowerCase();

    // usa género seleccionado o todos
    const source = currentArtists.length ? currentArtists : allArtists;

    const filtered = source.filter(a =>
        a.toLowerCase().includes(text)
    );

    if (filtered.length > 0) {
        emptyState.classList.add("d-none");
        showArtists(filtered);
    } else {
        artistList.innerHTML = "<p class='text-center'>No encontrado</p>";
    }
});

// 🌐 IP
fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .then(data => document.getElementById("ip").textContent = data.ip);

// 🧠 ESTADO INICIAL
artistView.classList.add("d-none");
songView.classList.add("d-none");
searchInput.disabled = false;
fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .then(data => {
        document.getElementById("ip").textContent = data.ip;
    })
    .catch(() => {
        document.getElementById("ip").textContent = "No disponible";
    });
