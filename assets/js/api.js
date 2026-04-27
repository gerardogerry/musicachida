export class MusicAPI {

    constructor() {
        this.baseURL = "https://itunes.apple.com/search";
    }

    async getSongs(artist) {
        const response = await fetch(`${this.baseURL}?term=${artist}&entity=song&limit=50`);
        const data = await response.json();
        return data.results;
    }

}