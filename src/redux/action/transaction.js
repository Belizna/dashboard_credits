import * as types from "../actionType"
import axios from "axios"


const getTransaction = (transactions) => ({
    type: types.GET_TRANSACTION,
    payload: transactions
})

const deleteTransaction = () => ({
    type: types.DELETE_TRANSACTION,
})

const addTransaction = () => ({
    type: types.ADD_TRANSACTION
})


export const loadTransaction = (record) => {
    return function(dispatch) {
        axios.get(`https://backend-dashboard-credits.herokuapp.com/transaction/search/${record}`)
        .then((resp) => {
            dispatch(getTransaction(resp.data))
        })
        .catch((error)=> console.log(error))
    }
}

export const transactionDelete = (deltransaction) => {
    return function(dispatch) {
        axios.delete(`https://backend-dashboard-credits.herokuapp.com/transaction/${deltransaction._id}`)
        .then((resp) => {
            dispatch(deleteTransaction())
            dispatch(loadTransaction(deltransaction.credit_name))
        })
        .catch((error) => console.log(error))
    }
}

export const transactionAdd = (value) => {
    return function(dispatch) {
        axios.post('https://backend-dashboard-credits.herokuapp.com/transaction/add', value)
        .then((resp) => {
            dispatch(addTransaction())
            dispatch(loadTransaction(value.credit_name))
        })
        .catch((error) => console.log(error))
    }
}