import * as types from "../actionType"
import axios from "axios"

const getPayment = (payment) => ({
    type: types.GET_PAYMENT,
    payload: payment
})

const paymentDelete = () => ({
    type: types.DELETE_PAYMENT
})

const paymentEdit = () => ({
    type: types.EDIT_PAYMENT
})

const paymentMakeUpdate = () => ({
    type: types.ADD_MAKE_UPDATE_PAYMENT
})

const paymentMakeResert = () => ({
    type: types.ADD_MAKERESET_UPDATE_PAYMENT
})



export const loadPayment = (record) => {
    return function(dispatch) {
        axios.get(`https://backend-dashboard-credits.herokuapp.com/repayments/search/${record}`)
        .then((resp) => {
            dispatch(getPayment(resp.data))
        })
        .catch((error) => console.log(error))
    }
}

export const makePayment = (add) => {
    return function(dispatch) {
        axios.post(`https://backend-dashboard-credits.herokuapp.com/repayments/make/update/${add._id}`)
        .then((resp) => {
            dispatch(paymentMakeUpdate())
            dispatch(loadPayment(add.credit_name))
        })
        .catch((error) => console.log(error))
    }
}

export const makeResetPayment = (del) => {
    return function(dispatch) {
        axios.post(`https://backend-dashboard-credits.herokuapp.com/repayments/makeresert/update/${del._id}`)
        .then((resp) => {
            dispatch(paymentMakeResert())
            dispatch(loadPayment(del.credit_name))
        })
        .catch((error) => console.log(error))
    }
}

export const deletePaymentId = (updatepayment) => {
    return function(dispatch) {
        axios.delete(`https://backend-dashboard-credits.herokuapp.com/repayments/${updatepayment._id}`)
        .then((resp) => {
            dispatch(paymentDelete())
            dispatch(loadPayment(updatepayment.credit_name))
        })
        .catch((error) => console.log(error))
    }
}

export const editPayment = (update, value) => {
    return function(dispatch) {
        console.log(update)
        console.log(value)
        axios.post(`https://backend-dashboard-credits.herokuapp.com/repayments/update/${update._id}`, value)
        .then((resp) => {
            dispatch(paymentEdit())
            dispatch(loadPayment(update.credit_name))
        })
    }
}
