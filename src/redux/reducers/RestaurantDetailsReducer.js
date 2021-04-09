import { RESTAURANT_DETAILS_FETCH_FAIL, RESTAURANT_DETAILS_FETCH_STARTED, RESTAURANT_DETAILS_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    restaurantDetails: null,
    isFetchingRestaurantDetails: false,
    fetchErrorMessage: '',
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case RESTAURANT_DETAILS_FETCH_STARTED:
            return {...state, isFetchingRestaurantDetails: true}
        case RESTAURANT_DETAILS_FETCH_SUCCESS:
            return {...state, restaurantDetails: action.payload, isFetchingRestaurantDetails: false}
        case RESTAURANT_DETAILS_FETCH_FAIL:
            return {...state, isFetchingRestaurantDetails: false, fetchErrorMessage: action.payload}
        default:
            return state;
    }
};