export class UI {

    constructor(container) {
        this.container = container;
    }

    renderSongs(songs, player) {

        this.container.innerHTML = "";

        if (!songs.length) {
            this.container.innerHTML = "<p>No hay resultados</p>";
            return;
        }

        songs.forEach(song => {

            const div = document.createElement("div");
            div.className = "col-md-3 col-sm-6 mb-3";

            div.innerHTML = `
                <div class="card p-2">
                    <img src="${song.artworkUrl100}">
                    <h6 class="song-title">${song.trackName}</h6>
                    <p class="song-artist">${song.artistName}</p>
                    <p><small>${song.collectionName || ""}</small></p>

                    ${
                        song.previewUrl
                        ? `<button class="btn btn-success btn-sm play">▶ Preview</button>
                           <audio src="${song.previewUrl}"></audio>`
                        : `<small>No preview</small>`
                    }
                </div>
            `;

            this.container.appendChild(div);
        });

        document.querySelectorAll(".play").forEach(btn => {
            btn.addEventListener("click", () => {
                const audio = btn.nextElementSibling;
                player.play(audio, btn);
            });
        });
    }
}