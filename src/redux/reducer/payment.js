import * as types from "../actionType"

const initialState = {
    payments: [],
    loading: true
}

const paymentsReducers = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_PAYMENT: 
            return {
                ...state,
                payments: action.payload,
                loading: false
            }
        case types.ADD_MAKE_UPDATE_PAYMENT:
            return {
                ...state,
                loading: false
            }
        case types.ADD_MAKERESET_UPDATE_PAYMENT:
            return {
                ...state,
                loading: false
            }
        case types.DELETE_PAYMENT:
            return {
                ...state,
                loading: false
            }
        case types.EDIT_PAYMENT:
            return {
                ...state,
                loading: false
            }
        default: 
        return state
    }
}

export default paymentsReducers