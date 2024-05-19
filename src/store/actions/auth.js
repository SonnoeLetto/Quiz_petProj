import axios from "axios";
import { AUTH_LOGOUT, AUTH_SUCCESS } from "./actionTypes";

const authSuccess = (token) => {
    return {
        type: AUTH_SUCCESS,
        token
    }
}
const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}
const autoLogout = (time) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}
export const auth = (email, password, isLogin) => {
    return async dispatch => {
        const authData = {
            email, password, returnSecureToken: true
        }
        let url = ''
        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBnanqyL1f5gCJAdzOsP42Uf5RJjX0Tvw8'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBnanqyL1f5gCJAdzOsP42Uf5RJjX0Tvw8'
        }

        const response = await axios.post(url, authData);
        console.log(response, 'res')
        const data = response.data;

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))
    }
}