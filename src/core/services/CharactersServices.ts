import API from "../utils/API/API";

class CharactersServices {
    public async getCharacters(start: number, limit: number) {
        return await API.get(`/characters?ts=1000&apikey=${String(process.env.REACT_APP_API_KEY)}&hash=${process.env.REACT_APP_HASH}&offset=${start}&limit=${limit}`);
    }

    public async getCharacter(id: string) {
        return await API.get(`/characters/${id}?ts=1000&apikey=${String(process.env.REACT_APP_API_KEY)}&hash=${process.env.REACT_APP_HASH}`);
    }
}

export default CharactersServices;