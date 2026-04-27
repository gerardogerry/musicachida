export class Player {

    constructor() {
        this.currentAudio = null;
    }

    play(audio, button) {

        if (this.currentAudio && this.currentAudio !== audio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }

        if (audio.paused) {
            audio.play();
            button.textContent = "⏸ Pausar";
            this.currentAudio = audio;
        } else {
            audio.pause();
            button.textContent = "▶ Preview";
        }
    }

}