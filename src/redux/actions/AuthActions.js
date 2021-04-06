import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_STARTED, AUTH_LOGIN_FAIL, AUTH_LOGOUT } from './types';
import { postLogin, postRegister } from '../../api/';


export const authLoginSuccess = (token) => {
    return {
        type: AUTH_LOGIN_SUCCESS,
        payload: token
    }
}
export const authLogout = () => {
    return {
        type: AUTH_LOGOUT
    }
}

export const loginWithUsernameAndPassword = (username, password) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOGIN_STARTED })

        postLogin(username, password)
        
        .then(res => {
            dispatch(authLoginSuccess(res.token))
        })
        .catch(err => {
            dispatch({ type: AUTH_LOGIN_FAIL, payload: err })
            alert('Invalid username or password')
        })
    }
}

export const registerWithUsernameAndPassword = (username, email, password) => {
    return (dispatch) => {
        postRegister(username, email, password)

        .then(res => {
            dispatch(loginWithUsernameAndPassword(username, password))
        })
        .catch(err => {
            alert('Error signing up, possibly taken username')
        })
    }
}