import { RESTAURANTS_FETCH_SUCCESS, RESTAURANTS_FETCH_STARTED, RESTAURANTS_FETCH_FAIL } from './types';
import { searchRestaurants } from '../../api/';


export const restaurantsFetchSuccess = (restaurants) => {
    return {
        type: RESTAURANTS_FETCH_SUCCESS,
        payload: restaurants
    }
}

export const fetchRestaurants = (searchTerm, locations) => {
    return (dispatch) => {
        dispatch({ type: RESTAURANTS_FETCH_STARTED })

        searchRestaurants(searchTerm, locations)
        .then(res => {
            dispatch(restaurantsFetchSuccess(res))
        })
        .catch(err => {
            dispatch({ type: RESTAURANTS_FETCH_FAIL, payload: err })
        })
    }
}
