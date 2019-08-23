import { combineReducers } from "redux"

const fetchUserDataReducer = (userData = [], action) => {
	if (action.type === "FETCH_USER_DATA") {
		return action.payload
	}

	return userData
}

export default combineReducers({
	userData: fetchUserDataReducer
})
