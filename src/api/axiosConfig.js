import axios from 'axios';

const herokuURL = 'https://mobby-resto-api.herokuapp.com/'

let instance = axios.create({
    baseURL: herokuURL,
});

export default instance;