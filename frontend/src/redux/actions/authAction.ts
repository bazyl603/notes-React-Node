import axios from 'axios';
import { actionTypes } from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token: string, userId: string | null): any => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error: any) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = (): any => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime: number) => {
    return (dispatch: (arg0: { type: actionTypes; }) => void) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (login: any, password: any, isSignup: any) => {
    return (dispatch: (arg0: { type: actionTypes; error?: any; }) => void) => {
        dispatch(authStart());
        let url = '';
        axios.post(url)
            .then()
            .catch((err: { response: { data: { error: any; }; }; }) => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const setAuthRedirectPath = (path: any) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = ()=> {
    return (dispatch: any) => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            let expirationDate: any = localStorage.getItem('expirationDate');
            expirationDate = new Number(expirationDate);
            expirationDate = new Date(expirationDate);
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};