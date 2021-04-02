import * as actionTypes from '../actions/actionTypes';

const initialState = {
    feed : null,
    suggestions : null,
    error : null,
    loading : false,
}

const reducer = (state = initialState, actions) => {
    switch(actions.type){
        case actionTypes.FETCH_FEED_SUCESS : {
            return {
                ...state,
                feed : actions.feed
            }
        }
        case actionTypes.FETCH_FEED_FAIL : {
            return {
                ...state,
                error : actions.error
            }
        }
        case actionTypes.FETCH_SUGGESTIONS_SUCESS : {
            return {
                ...state,
                suggestions : actions.suggestions
            }
        }
        default : 
            return state;
    }
};

export default reducer;