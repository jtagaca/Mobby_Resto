import { USER_FETCH, USER_BIO_SET, USER_LOCATION_SET } from './types';
import { getUserInfo } from '../../api/';

export const getUser = () => {
    return (dispatch) => {
        
        getUserInfo()
        .then(res => dispatch({ type: USER_FETCH, payload: res }))
        .catch((err) => console.log(err))
    }
}

export const setBio = (bio) => {
    return (dispatch) => {
        dispatch({
            type: USER_BIO_SET,
            payload: bio
        })
    }
}

export const setLocation = (location) => {

    return (dispatch) => {
        dispatch({
            type: USER_LOCATION_SET,
            payload: location
        })
    }
}