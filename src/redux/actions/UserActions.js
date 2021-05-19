import { USER_FETCH, USER_BIO_SET, USER_LOCATION_SET, USER_ADD_FAVORITE, USER_REMOVE_FAVORITE, USER_CLEAR_FAVORITES } from './types';
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

export const addFavorite = (name, id, photo) => {

    let temp = new Object({
        name: name,
        id: id,
        photo: photo,
    });

    return (dispatch) => {
        dispatch({
            type: USER_ADD_FAVORITE,
            payload: temp
        })
    }
}
export const removeFavorite = (id) => {
    return (dispatch) => {
        dispatch({
            type: USER_REMOVE_FAVORITE,
            payload: id
        })
    }
}

export const removeAllFavorites = () => {
    return (dispatch) => {
        dispatch({
            type: USER_CLEAR_FAVORITES,
        })
    }
}