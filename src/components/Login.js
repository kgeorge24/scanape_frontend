import React, { Component } from "react"
import "../css/Login.css"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { loginUserHandler } from "../actions"

class Login extends Component {
	state = {
		username: "",
		password: ""
	}

	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value })
	}

	render() {
		return (
			<div>
				<header>
					<div className="form-container">
						<form
							className="form"
							onSubmit={e =>
								this.props.loginUserHandler(e, this.state, this.props.history)
							}
						>
							<div className="form-heading">
								<h1>Scanape</h1>
							</div>

							<div className="input-holder">
								<input
									className="form-input"
									placeholder="Username"
									value={this.state.username}
									name="username"
									onChange={this.changeHandler}
								/>
								<br />
								<input
									type="password"
									className="form-input"
									placeholder="Password"
									value={this.state.password}
									name="password"
									onChange={this.changeHandler}
								/>
								<br />
								<button className="form-submit">Login</button>
								<p>Register Here</p>
							</div>
						</form>
					</div>
				</header>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state
}

export default connect(
	mapStateToProps,
	{ loginUserHandler }
)(withRouter(Login))
