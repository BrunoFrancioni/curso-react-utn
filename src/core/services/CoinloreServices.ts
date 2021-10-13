import API from "../utils/API/API";

class CoinloreServices {
    public async getTickers(start: number, limit: number) {
        return await API.get(`/tickers/?start=${start}&limit=${limit}`);
    }

    public async getTicker(id: string) {
        return await API.get(`/ticker/?id=${id}`);
    }
}

export default CoinloreServices;