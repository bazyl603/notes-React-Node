import { actionTypes } from '../actions/actionTypes';
import { updateObject } from '../utility';

type State = {
    readonly token: string | null;
    readonly userId: string | null;
    readonly error: any;
    readonly loading: boolean;
    readonly authRedirectPath: string;
};

const initState: State = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'    
};

const authStart = ( state: any, action: any ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state: any, action: { token: any; userId: any; }) => {
    return updateObject( state, { 
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
     } );
};

const authFail = (state: any, action: { error: any; }) => {
    return updateObject( state, { error: action.error, loading: false });
};

const authLogout = (state: any, action: { token: any; userId: any; }) => {
    return updateObject(state, { token: null, userId: null });
};

const setAuthRedirectPath = (state: any, action: { path: any; }) => {
    return updateObject(state, { authRedirectPath: action.path })
};

const reducer = ( state = initState, action: any ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        default:
            return state;
    }
};

export default reducer;