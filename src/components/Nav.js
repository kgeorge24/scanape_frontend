import React, { Component } from "react"
import { Link } from "react-router-dom"
import "../css/Nav.css"

export default class Nav extends Component {
	clickedLogout = () => {
		localStorage.clear()
	}

	showLoginOrLogout = () => {
		switch (!!localStorage.getItem("token")) {
			case true:
				return (
					<React.Fragment>
						<li className="nav-links right">
							<Link
								to="/login"
								data-value="register"
								onClick={this.clickedLogout}
							>
								Logout
							</Link>
						</li>
						<li className="nav-links right">
							<div>
								<img src={require("../img/profile.png")} alt="" /> Hi,{" "}
								{this.props.user.name}
							</div>
						</li>
					</React.Fragment>
				)
			case false:
				return (
					<React.Fragment>
						<li className="nav-links right">
							<Link
								to="/register"
								onClick={this.props.click}
								data-value="register"
							>
								Register
							</Link>
						</li>
						<li className="nav-links right">
							<Link to="/login" data-value="login" onClick={this.props.click}>
								Login
							</Link>
						</li>
					</React.Fragment>
				)
			default:
				return null
		}
	}

	render() {
		return (
			<nav>
				<ul>
					{this.showLoginOrLogout()}
					<li className="nav-links left">
						<Link to="/home" data-value="home" onClick={this.props.click}>
							Home
						</Link>
					</li>
					<li className="nav-links left">
						<Link to="recipes" data-value="recipes">
							Recipes
						</Link>
					</li>
					<li className="nav-links left">
						<Link
							to="grocerylist"
							data-value="grocerylist"
							onClick={this.props.click}
						>
							Pantry
						</Link>
					</li>
				</ul>
			</nav>
		)
	}
}
