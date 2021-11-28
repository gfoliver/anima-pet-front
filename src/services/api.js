import axios from 'axios';

export default axios.create({
    baseURL: 'https://anima-pet-api.herokuapp.com/'
});