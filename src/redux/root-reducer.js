import {combineReducers} from "redux"
import creditsReducers from "./reducer/credits"
import paymentsReducers from "./reducer/payment"
import transactionReducers from "./reducer/transaction"

const rootReducer = combineReducers({
    data_credits: creditsReducers,
    data_payments: paymentsReducers,
    data_transactions: transactionReducers
})

export default rootReducer