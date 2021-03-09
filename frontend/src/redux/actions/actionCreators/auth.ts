import axios from 'axios';
import { Dispatch } from 'redux';
import { AuthTypes } from '../actionTypes/index';

export const authStart = () => {
    return {
        type: AuthTypes.AUTH_START
    }
}

export const authSuccess = (token: string, userId: string) => {
    return {
        type: AuthTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error: string) => {
    return {
        type: AuthTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: AuthTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime: number) => {
    return (dispatch: Dispatch<any>) => {
        setTimeout(() => {
            dispatch(logout());
        }, 10000);
    }
}