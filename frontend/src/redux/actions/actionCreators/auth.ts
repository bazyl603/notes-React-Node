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
        }, expirationTime);
    }
}

export const auth = (login: string, password: string, isSignup: boolean) => {    
    return (dispatch: Dispatch<any>) => {
        dispatch(authStart());
        if (!isSignup) {
            dispatch(logout());
        }
        
        axios.post('http://localhost:8080/auth/login',{
            login: login,
            password: password
        }).then(res=>console.log(res))
        .catch(err => {
            dispatch(logout());
        });
    }
};

export const authCheckState = () => {
    return (dispatch: Dispatch<any>) => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = localStorage.getItem('expirationDate');
            if (expirationDate == null) {
                dispatch(logout());
            } else {
                const expirationDateFix = new Date(expirationDate);
                if (expirationDateFix <= new Date()) {
                    dispatch(logout());
                } else {
                    const userId = localStorage.getItem('userId');
                    if (userId == null) {
                        dispatch(logout());
                    } else {
                        dispatch(authSuccess(token, userId));
                        dispatch(checkAuthTimeout((expirationDateFix.getTime() - new Date().getTime()) ));
                    }
                }
            }
        }
    }
}