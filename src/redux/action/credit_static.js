import * as types from "../actionType"
import axios from "axios"


const getTransactionStatic = (credit_static) => ({
    type: types.GET_TRANSACTION_STATIC,
    payload: credit_static
})

export const transactionStatic = (record) => {
    return function(dispath) {
        axios.get(`https://backend-dashboard-credits.herokuapp.com/transaction/credit_static/${record}`)
        .then((resp)=> {
            dispath(getTransactionStatic(resp))
        })
        .catch((error)=> console.log(error))
    }
}