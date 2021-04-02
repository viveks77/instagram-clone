import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user : null,
    token : null,
    error : null,
    updateError : null,
    authRedirectPath : "",
}

const reducer = (state = initialState, actions) => {
    switch(actions.type){
        case actionTypes.AUTH_SUCESS : 
            return {
                ...state,
                user : actions.user,
                token : actions.token,
                authRedirectPath : '/'
            }
        case actionTypes.AUTH_START : 
            return {
                ...state,
            }
        case actionTypes.AUTH_FAIL :
            return {
                ...state,
                error : actions.error
            }
        case actionTypes.AUTH_LOGOUT : 
            return {
                user : null,
                token : null,
                error : null,
                authRedirectPath : '/login'
            }
        case actionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                user : actions.user,
                token : actions.token,
                authRedirectPath : '/editprofile'
            }
        case actionTypes.SIGNUP_FAIL:
            return{
                ...state,
                error : actions.error
            }
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirect : actions.path
            }
        case actionTypes.USER_UPDATE_SUCCESS : 
            return {
                ...state,
                user : actions.user,
            }
        case actionTypes.USER_UPDATE_FAIL : 
            return {
                ...state,
                updateError : actions.error
            }
        default:
            return {
                ...state,
            };
    }
}

export default reducer;