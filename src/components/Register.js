import React, { Component } from "react"
import "../css/Register.css"
import { connect } from "react-redux"
import { registerUserHandler } from "../actions"
import { withRouter } from "react-router-dom"

class Register extends Component {
	state = {
		name: "",
		username: "",
		password: ""
	}

	// Saves information being typed in signup form to state.
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
							onSubmit={e => {
								this.props.registerUserHandler(
									e,
									this.state,
									this.props.history
								)
							}}
						>
							<div className="form-heading">
								<h1>Register</h1>
							</div>

							<div className="input-holder">
								<input
									type="text"
									placeholder="Name"
									name="name"
									className="form-input"
									value={this.state.name}
									onChange={this.changeHandler}
								/>

								<br />

								<input
									type="text"
									placeholder="Username"
									name="username"
									className="form-input"
									value={this.state.username}
									onChange={this.changeHandler}
								/>

								<br />

								<input
									type="password"
									placeholder="Password"
									name="password"
									className="form-input"
									value={this.state.password}
									onChange={this.changeHandler}
								/>

								<br />

								<button className="form-submit">Register</button>
								<p>Forgot password?</p>
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
	{ registerUserHandler }
)(withRouter(Register))
