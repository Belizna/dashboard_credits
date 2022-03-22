import * as types from "../actionType"

const initialState = {
    user: [],
    isAuth: false,
    loading: true
}

const userReducers = (state = initialState, action) => {
    switch(action.type) {
        case types.GET_USER:
            return {
                ...state,
                user: action.payload,
                isAuth: true,
                loading: false
            }
        default: 
            return state
    }
}

export default userReducers