import { USER_BIO_SET, USER_FETCH, USER_LOCATION_SET, USER_ADD_FAVORITE, USER_REMOVE_FAVORITE, USER_CLEAR_FAVORITES } from '../actions/types'

const INITIAL_STATE = {
  user: null,
  location: null,
  bio: null,
  favorites: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_FETCH:
            return {...state, user: action.payload }
        case USER_BIO_SET:
            return {...state, bio: action.payload }
        case USER_LOCATION_SET:
            return {...state, location: action.payload }
        case USER_ADD_FAVORITE:
            let addTemp = []
            if (state.favorites)
                addTemp = state.favorites;

            addTemp.push(action.payload);
            return {...state, favorites: addTemp }
        case USER_REMOVE_FAVORITE:
            let removalTemp = state.favorites;
            
            removalTemp.splice(removalTemp.findIndex(
                    (function(favorite, index) {
                        if (favorite.id === action.payload) {
                            return true;
                        }
                    }
                )
            
            ), 1);
            return {...state, favorites: removalTemp }
        case USER_CLEAR_FAVORITES:
            let newFavorites = []
            return {...state, favorites: newFavorites}
        default:
            return state
    }
};