import * as types from "../actionType"

const initialState = {
    credits: [],
    loading: true
}


const creditsReducers = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_CREDITS: 
            return {
                ...state,
                credits: action.payload,
                loading: false
            }
        case types.DELETE_CREDIT:
            return {
                ...state,
                loading: false
            }
        case types.ADD_CREDIT: 
            return {
                ...state,
                loading: false
            }
        default: 
        return state
    }
}


export default creditsReducers;