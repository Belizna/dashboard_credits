import * as types from "../actionType"
import axios from "axios"

const getCredits = (credits) => ({
    type: types.GET_CREDITS,
    payload: credits,
})

const creditDelete = () => ({
    type: types.DELETE_CREDIT
})

const creditAdd = () => ({
    type: types.ADD_CREDIT
})

export const loadCredits = () => {
    return function (dispatch) {
        axios.get(`https://backend-dashboard-credits.herokuapp.com/credit/`)
        .then((resp) => {
            dispatch(getCredits(resp.data))
        })
        .catch((error) => console.log(error))
    }
}

export const deleteCredit = (_id) => {
    return function(dispatch) {
        axios.delete(`https://backend-dashboard-credits.herokuapp.com/credit/${_id}`)
        .then((resp) => {
            dispatch(creditDelete())
            dispatch(loadCredits())
        })
        .catch((error) => console.log(error))
    }
}

export const addCredit = (credit) => {
    return function(dispatch) {
        axios.post('https://backend-dashboard-credits.herokuapp.com/credit/add', credit)
        .then((resp) => {
            dispatch(creditAdd())
            dispatch(loadCredits())
        })
        .catch((error) => console.log(error))
    }
}