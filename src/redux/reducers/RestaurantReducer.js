import { RESTAURANTS_FETCH_FAIL, RESTAURANTS_FETCH_STARTED, RESTAURANTS_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    restaurants: null,
    isFetchingRestaurants: false,
    fetchErrorMessage: '',
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case RESTAURANTS_FETCH_STARTED:
            return {...state, isFetchingRestaurants: true}
        case RESTAURANTS_FETCH_SUCCESS:
            return {...state, restaurants: action.payload, isFetchingRestaurants: false}
        case RESTAURANTS_FETCH_FAIL:
            return {...state, isFetchingRestaurants: false, fetchErrorMessage: action.payload}
        default:
            return state;
    }
};