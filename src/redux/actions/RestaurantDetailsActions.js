import { RESTAURANT_DETAILS_FETCH_SUCCESS, RESTAURANT_DETAILS_FETCH_STARTED, RESTAURANT_DETAILS_FETCH_FAIL } from './types';
import { searchRestaurantDetails, fetchReviews } from '../../api/';


export const restaurantDetailsFetchSuccess = (restaurantDetails) => {
    return {
        type: RESTAURANT_DETAILS_FETCH_SUCCESS,
        payload: restaurantDetails
    }
}

export const fetchRestaurantDetails = (id) => {
    return (dispatch) => {
        dispatch({ type: RESTAURANT_DETAILS_FETCH_STARTED })

        searchRestaurantDetails(id)
        .then(details => {
            fetchReviews(id)
            .then(reviews => { 
                details.reviews = reviews; 
                dispatch(restaurantDetailsFetchSuccess(details)); 
            })
            .catch(err => {
                dispatch({ type: RESTAURANT_DETAILS_FETCH_FAIL, payload: err })
            })
        })
        .catch(err => {
            dispatch({ type: RESTAURANT_DETAILS_FETCH_FAIL, payload: err })
        })
    }
}

