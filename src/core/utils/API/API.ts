import axios from 'axios';

export default axios.create({
    baseURL: "https://api.coinlore.net/api",
    responseType: 'json',
    headers:
    {
        "Content-Type": "application/json"
    }
});