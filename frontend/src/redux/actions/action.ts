import { AuthTypes } from './actionTypes';

interface StartAction {
    type: AuthTypes.AUTH_START;
}
interface SuccessAction {
    type: AuthTypes.AUTH_SUCCESS;
    token: string;
    userId: string;
    error: null;
    loading: boolean;
    authRedirectPath: string;
}
interface FailAction {
    type: AuthTypes.AUTH_FAIL;
    token: null;
    userId: null;
    error: string;
    loading: boolean;
    authRedirectPath: string;
}
interface LogoutAction {
    type: AuthTypes.AUTH_LOGOUT;
    token: null;
    userId: null;
    error: null;
    loading: boolean;
    authRedirectPath: string;
}

export type AuthAction = StartAction | SuccessAction | FailAction | LogoutAction;