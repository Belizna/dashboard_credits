import * as types from "../actionType"
import axios from "axios"

const getUser= (user) => ({
    type: types.GET_USER,
    payload: user
})

export const loadUser = (record) => {
    return function(dispatch) {
        axios.post("https://backend-dashboard-credits.herokuapp.com/user/login/",record)
        .then((resp) => {
            dispatch(getUser(resp.data))
            localStorage.setItem('token', resp.data.token)
        })
        .catch((error)=> console.log(error))
    }
}