import yelp from './yelp';
import axios from './axiosConfig';


export const searchRestaurants = async (searchTerm, locations = "bakersfield") => {
    return new Promise((resolve, reject) => {
        yelp.get('/search', {
                params: {
                    limit: 50,
                    term: searchTerm,
                    location: locations
                }
            })
            .then((res) => resolve(res.data))
            .catch((err) => console.log(err))
    })
};

export const searchRestaurantDetails = async (id) => {
    return new Promise((resolve, reject) => {
        yelp.get(`/${id}`, {})
            .then((res) => resolve(res.data))
            .catch((err) => console.log(err))
    })
};

export const fetchReviews = async (id) => {
    return new Promise((resolve, reject) => {
        yelp.get(`/${id}/reviews`, {})
            .then((res) => resolve(res.data))
            .catch((err) => console.log(err))
    })
};

export const postLogin = async (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post('api/Authenticate/login', {
                username: username,
                password: password
            })
            .then((res) => resolve(res.data))
            .catch((err) => reject(err))
    })
}

export const postRegister = async (username, email, password) => {
    return new Promise((resolve, reject) => {
        axios.post('api/Authenticate/register', {
                username: username,
                password: password,
                email: email
            })
            .then((res) => resolve(res.data))
            .catch((err) => reject(err))
    })
}

export const getUserInfo = async () => {
    return new Promise((resolve, reject) => {
        axios.get('User')
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
}