import * as types from "../actionType"

const initialState = {
    transactions: [],
    loading: true
}


const transactionReducers = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_TRANSACTION:
            return {
                ...state,
                transactions: action.payload,
                loading: false
            }
        case types.DELETE_TRANSACTION:
            return {
                ...state,
                loading: false
            }
        default: 
            return state
    }
}

export default transactionReducers