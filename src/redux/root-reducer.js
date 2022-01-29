import {combineReducers} from "redux"
import creditsReducers from "./reducer/credits"
import paymentsReducers from "./reducer/payment"
import transactionReducers from "./reducer/transaction"
import credit_staticReducers from "./reducer/credit_static"

const rootReducer = combineReducers({
    data_credits: creditsReducers,
    data_payments: paymentsReducers,
    data_transactions: transactionReducers,
    data_credit_static: credit_staticReducers
})

export default rootReducer