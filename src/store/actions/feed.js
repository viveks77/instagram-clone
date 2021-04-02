import * as actionTypes from './actionTypes';
import axios from '../../axios';

//TODO : Add loader
export const fetchStart = () => {
    return {
        type : actionTypes.FETCH_START,
    }
}


export const fetchFeedSucess = (feed) => {
    return {
        type : actionTypes.FETCH_FEED_SUCESS,
        feed : feed
    }
}

export const fetchFeedFail = (error) => {
    return {
        type : actionTypes.FETCH_FEED_FAIL,
        error : error
    }
}


export const fetchSuggestionsSucess = (suggestions) => {
    return {
        type : actionTypes.FETCH_SUGGESTIONS_SUCESS,
        suggestions
    }
}

export const fetchSuggestionsFail = (error) => {
    return {
        type : actionTypes.FETCH_SUGGESTIONS_FAIL,
        error : error
    }
}

export const fetchExploreStart = () => {
    return {
        type : actionTypes.FETCH_EXPLORE_START,
    }
}

export const fetchExploreSuccess = (feed) => {
    return {
        type : actionTypes.FETCH_EXPLORE_SUCCESS,
        feed
    }
}

export const fetchExploreFail = (error) => {
    return {
        type : actionTypes.FETCH_EXPLORE_FAIL,
        error
    }
}

export const fetchSuggestions = (token) => {
    return async dispatch => {
        await axios.get('/getsuggestions', {
            headers : {'Authorization' : "Bearer " + token}
        }).then(response => {
            dispatch(fetchSuggestionsSucess(response.data.suggestions));
        }).catch(error => {
            dispatch(fetchSuggestionsFail(error.message));
        })
    }
}


export const fetchFeed =  (token) => {
    return async dispatch => {
        await axios.get('/feed', {
            headers : {'Authorization' : "Bearer " + token}
        }).then(response => {
            dispatch(fetchFeedSucess(response.data.posts));
        }).catch(error => {
            dispatch(fetchFeedFail(error.message));
        })
    }
}


export const fetchExploreFeed = (token) => {
    return async dispatch => {
        dispatch(fetchExploreStart());
        await axios.get('/posts', {
            headers : {'Authorization' : "Bearer " + token}
        }).then(response => {
            dispatch(fetchExploreSuccess(response.data.posts));
        }).catch(error => {
            dispatch(fetchExploreFail(error.message));
        })
    }
}