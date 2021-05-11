import { USER_BIO_SET, USER_FETCH, USER_LOCATION_SET } from '../actions/types'

const INITIAL_STATE = {
  user: null,
  location: null,
  bio: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_FETCH:
            return {...state, user: action.payload }
        case USER_BIO_SET:
            return {...state, bio: action.payload }
        case USER_LOCATION_SET:
            return {...state, location: action.payload }
        default:
            return state
    }
};