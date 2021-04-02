import * as actionTypes from '../actions/actionTypes';

const initialState = {
    feed : null,
    error : null,
    loading : false,
}

const reducer = (state = initialState, actions) => {
    switch(actions.type){
        case actionTypes.FETCH_EXPLORE_START : {
            return {
                ...state,
                loading : true,
            }
        }
        case actionTypes.FETCH_EXPLORE_SUCCESS : {
            return {
                ...state,
                feed : actions.feed,
                loading : false,
            }
        }
        case actionTypes.FETCH_EXPLORE_FAIL : {
            return {
                ...state,
                error : actions.error,
                loading : false
            }
        }
        default : 
            return state
    }
}

export default reducer;