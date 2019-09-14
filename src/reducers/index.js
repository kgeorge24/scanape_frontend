import { combineReducers } from "redux"

const fetchUserDataReducer = (userData = [], action) => {
	if (action.type === "FETCH_USER_DATA") {
		return action.payload
	}

	return userData
}

const fetchItemQuantityReducer = (itemQuantity = null, action) => {
	if (action.type === "FETCH_ITEM_COUNT") {
		return action.payload
	}

	return itemQuantity
}

export default combineReducers({
	userData: fetchUserDataReducer,
	itemQuantity: fetchItemQuantityReducer
})
