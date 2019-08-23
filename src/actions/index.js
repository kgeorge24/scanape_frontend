export const fetchUserData = () => dispatch => {
	let token = localStorage.getItem("token")

	if (token) {
		fetch("http://localhost:3000/current_user", {
			headers: {
				"Content-Type": "application/json",
				Accepts: "application/json",
				Authorization: token
			}
		})
			.then(res => res.json())
			.then(json => {
				dispatch({ type: "FETCH_USER_DATA", payload: json })
			})
	}
}

export const registerUser = (event, formInfo) => dispatch => {
	event.preventDefault()

	fetch("http://localhost:3000/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accepts: "application/json"
		},
		body: JSON.stringify({
			name: formInfo.name,
			username: formInfo.username,
			password: formInfo.password
		})
	})
		.then(res => res.json())
		.then(json => {
			if (json.jwt) {
				localStorage.setItem("token", json.jwt)
				this.setState({ user: json })
			}
		})
	this.props.history.push("/home")
}
