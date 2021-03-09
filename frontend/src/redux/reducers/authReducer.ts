import { AuthTypes } from '../actions/actionTypes';
import { AuthAction } from '../actions/action';

interface AuthState {
    token: string | null;
    userId: string | null;
    error: string | null;
    loading: boolean;
    authRedirectPath: string | null;
}

const initState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: null
}

const reducer = (state: AuthState = initState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthTypes.AUTH_START:
            return { token: null, userId: null, error: null, loading: true, authRedirectPath: null };
        case AuthTypes.AUTH_SUCCESS:
            return { token: action.token, userId: action.userId, error: null, loading: false, authRedirectPath: '/notes' };
        case AuthTypes.AUTH_FAIL:
            return { token: null, userId: null, error: action.error, loading: false, authRedirectPath: '/auth' };
        case AuthTypes.AUTH_LOGOUT:
            return { token: null, userId: null, error: null, loading: false, authRedirectPath: '/' };
        default:
            return state;
    }
}

export default reducer;