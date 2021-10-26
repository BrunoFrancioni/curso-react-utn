import axios from 'axios';

export default axios.create({
    baseURL: "https://gateway.marvel.com/v1/public",
    responseType: 'json',
    headers:
    {
        "Content-Type": "application/json"
    }
});