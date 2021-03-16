import yelp from './yelp';

export const searchRestaurants = async (searchTerm) => {
    return new Promise((resolve, reject) => {
        yelp.get('/search', {
            params: {
                limit: 50,
                term: searchTerm,
                location: 'bakersfield'
            }
        })
        .then((res) => resolve(res.data))
        .catch((err) => console.log(err))
    })
};