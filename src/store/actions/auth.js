import axios from '../../axios';
import * as actionTypes from './actionTypes';


export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    }
}

export const authSuccess = (user, token) => {
    return {
        type : actionTypes.AUTH_SUCESS,
        user,
        token
    }
}

export const authFail = (error) => {
    return {
        type : actionTypes.AUTH_FAIL,
        error : error
    }
}


export const signUpStart = () => {
    return{
        type : actionTypes.SIGNUP_START
    }
}

export const signUpSuccess = (user, token) => {
    return {
        type : actionTypes.SIGNUP_SUCCESS,
        token,
        user
    }
}

export const signUpFail = (error) => {
    return {
        type : actionTypes.SIGNUP_FAIL,
        error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return {
        type : actionTypes.AUTH_LOGOUT
    }
}

export const updateUserSuccess = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    return {
        type : actionTypes.USER_UPDATE_SUCCESS,
        user,
    }
}

export const updateUserFail = (error) => {
    return {
        type : actionTypes.USER_UPDATE_FAIL,
        error,
    }
}

const saveUser = (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
}

export const auth = (username, password) => {
    return async (dispatch) => {
        dispatch(authStart());
        const authData = {
            username : username,
            password : password
        };
        await axios.post("/login", authData)
                    .then(response => {
                        const token = response.data.token;
                        const user = response.data.user;
                        saveUser(user, token);
                        dispatch(authSuccess(user, token));
                    })
                    .catch(error => {
                        dispatch(authFail(error.response.data.error));
                    });
    };
}


export const signUp = (userdata) => {
    return async dispatch => {
        await axios.post("/signup", userdata)
                    .then(response => {
                        const token = response.data.token;
                        const user = response.data.user;
                        saveUser(user, token);
                        dispatch(signUpSuccess(user, token))
                    })
                    .catch(error => {
                        dispatch(signUpFail(error.response.data.error));
                    })
    }
}


export const setAuthRedirectPath = (path) => {
    return {
        type : actionTypes.SET_AUTH_REDIRECT_PATH,
        path : path
    }
}

export const checkAuthToken = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else{
            const user = JSON.parse(localStorage.getItem("user"));
            dispatch(authSuccess(user, token));
        }
    }
}