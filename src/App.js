import React, { Component } from "react"
import "./App.css"
import LandingPage from "./components/LandingPage"
import { Route, Switch } from "react-router-dom"
import Nav from "./components/Nav"
import Login from "./components/Login"
import Register from "./components/Register"
import GroceryList from "./components/GroceryList"
import Recipes from "./components/Recipes"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { fetchUserData } from "./actions"

class App extends Component {
	state = {
		user: {},
		change: false,
		currentRecipe: [],
		clicked: false,
		selectedItems: []
	}

	componentDidMount() {
		this.props.fetchUserData()
	}

	setCurrentRecipe = recipe => {
		this.setState(
			{
				currentRecipe: recipe,
				clicked: true
			},
			() => this.props.history.push("/info")
		)
	}

	gives = () => {
		return this.state.currentRecipe
	}

	collectSelectedItems = item => {
		console.log("reached")
		this.setState({ selectedItems: [...this.state.selectedItems, item] }, () =>
			console.log(this.state.selectedItems)
		)
	}

	deleteSelectedItem = index => {
		let newIngredientsArray = [...this.state.selectedItems]
		newIngredientsArray.splice(index, 1)

		this.setState(
			{
				selectedItems: newIngredientsArray
			},
			() => console.log(this.state.selectedItems)
		)
	}

	render() {
		return (
			<div className="app" onScroll={this.scrollHandler}>
				<Nav />
				<Switch>
					<Route path="/login" render={() => <Login />} />

					<Route path="/register" render={() => <Register />} />

					<Route path="/home" render={() => <LandingPage />} />

					<Route
						path="/grocerylist"
						render={() => (
							<GroceryList
								user={this.props.user}
								collectSelectedItems={this.collectSelectedItems}
								selectedItems={this.state.selectedItems}
								deselectItem={this.deleteSelectedItem}
							/>
						)}
					/>

					<Route
						exact
						path="/recipes"
						render={() => (
							<Recipes
								selectRecipe={this.setCurrentRecipe}
								currentRecipe={this.state.currentRecipe}
								clicked={this.state.clicked}
								items={this.state.selectedItems}
							/>
						)}
					/>
				</Switch>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state
}

export default connect(
	mapStateToProps,
	{ fetchUserData }
)(withRouter(App))
