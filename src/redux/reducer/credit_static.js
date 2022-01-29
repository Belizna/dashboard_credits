import * as types from "../actionType"

const initialState = {
    credit_static: [],
    loading: true
}


const credit_staticReducers = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_TRANSACTION_STATIC:
            return {
                ...state,
                credit_static: action.payload,
                loading: false
            }
        default: 
            return state
    }
}

export default credit_staticReducers