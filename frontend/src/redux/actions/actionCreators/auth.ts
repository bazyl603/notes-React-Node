import axios from 'axios';
import { Dispatch } from 'redux';
import { AuthTypes } from '../actionTypes/index';
import { clearNotes, getNotes } from './notes';

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
            dispatch(clearNotes());
        }, expirationTime);
    }
}

export const auth = (login: string, password: string) => {    
    return (dispatch: Dispatch<any>) => {
        dispatch(authStart());
        
        axios.post('http://localhost:8080/auth/login',{
            login: login,
            password: password
        }).then(res => {
            const expirationDate = new Date(new Date().getTime() + res.data.expiresTime * 3600000);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('expirationDate', JSON.stringify(expirationDate));
            localStorage.setItem('userId', res.data.userId);
            dispatch(authSuccess(res.data.token, res.data.userId));
            dispatch(checkAuthTimeout(res.data.expiresTime * 3600000));
        })
        .catch(err => {
            dispatch(authFail('bad login or password'));
        });
    }
};

export const authCheckState = () => {
    return (dispatch: Dispatch<any>) => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
            dispatch(clearNotes())
        } else {
            const expirationDate = localStorage.getItem('expirationDate');            
            if (!expirationDate) {
                dispatch(logout());
                dispatch(clearNotes())
            } else {
                const dataFix = new Date(JSON.parse(expirationDate));
                if (dataFix <= new Date()) {
                    dispatch(logout());
                    dispatch(clearNotes())
                } else {
                    const userId = localStorage.getItem('userId');
                    
                    if (!userId) {
                        dispatch(logout());
                        dispatch(clearNotes())
                    } else {
                        dispatch(authSuccess(token, userId));
                        dispatch(checkAuthTimeout((dataFix.getTime() - new Date().getTime())));
                        dispatch(getNotes(token, userId));
                        console.log(typeof userId);
                    }
                }
            }
        }
    }
}