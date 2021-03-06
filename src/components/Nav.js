import React, { Component } from "react"
import { Link } from "react-router-dom"
import "../css/Nav.css"
import { connect } from "react-redux"

class Nav extends Component {
	state = {
		toggleProfileOptions: "profile-menu-hidden"
	}

	clickedLogout = () => {
		localStorage.clear()
	}

	toggleProfileOptions = () => {
		this.state.toggleProfileOptions === "profile-menu"
			? this.setState({ toggleProfileOptions: "profile-menu-hidden" })
			: this.setState({ toggleProfileOptions: "profile-menu" })
	}

	closeToggleProfileOptions = () => {
		this.setState({ toggleProfileOptions: "profile-menu-hidden" })
	}

	profileMenu = () => {
		return (
			<div className={this.state.toggleProfileOptions}>
				<h4>{this.props.userData.username}</h4>
				<hr />
				<p>
					<a href="/login" onClick={this.clickedLogout}>
						Logout
					</a>
				</p>
			</div>
		)
	}

	showLoginOrLogout = () => {
		switch (!!localStorage.getItem("token")) {
			case true:
				return (
					<React.Fragment>
						<li className="nav-links right">
							<div onClick={this.toggleProfileOptions}>
								<img src={require("../img/profile.png")} alt="" /> Hi,{" "}
								{this.props.userData.name}!
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
			<div>
				<nav>
					<ul>
						{this.showLoginOrLogout()}
						<li className="nav-links left">
							<Link
								to="/home"
								data-value="home"
								onClick={this.closeToggleProfileOptions}
							>
								Home
							</Link>
						</li>
						<li className="nav-links left">
							<Link
								to="recipes"
								data-value="recipes"
								onClick={this.closeToggleProfileOptions}
							>
								Recipes
							</Link>
						</li>
						<li className="nav-links left">
							<Link
								to="grocerylist"
								data-value="grocerylist"
								onClick={this.closeToggleProfileOptions}
							>
								Pantry
							</Link>
						</li>
					</ul>
				</nav>
				{this.profileMenu()}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state
}

export default connect(mapStateToProps)(Nav)
