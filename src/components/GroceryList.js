import React, { Component } from "react"
import GroceryCard from "./GroceryCard"
import "../css/GroceryList.css"
import { connect } from "react-redux"
import { fetchUserData } from "../actions"
class GroceryList extends Component {
	constructor() {
		super()
		this.state = {
			barcode: "",
			ingredients: [],
			user: {},
			userIngredientsArray: [],
			deleted: false
		}
	}

	// Gets current user and passes it to get user ingredients.
	componentDidMount = () => {
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
				.then(json =>
					this.setState({ user: json }, () =>
						this.getUserIngredients(this.state)
					)
				)
		}
	}

	// gets current users ingredients and saves it to state.
	getUserIngredients = state => {
		let token = localStorage.getItem("token")

		fetch("http://localhost:3000/user_ingredients", {
			headers: {
				"Content-Type": "application/json",
				Authorization: token
			}
		})
			.then(res => res.json())
			.then(userIngredients => {
				let arrayOfUserIngredients = []

				userIngredients.forEach(userIngredient => {
					let id = state.user.id

					if (parseInt(userIngredient.user_id) === id) {
						arrayOfUserIngredients.push(userIngredient)
					}
				})

				this.getIngredients(arrayOfUserIngredients)
			})
	}

	// gets ingredients and saves it to state which gets mapped over to create grocery cards.
	getIngredients = state => {
		let token = localStorage.getItem("token")
		// console.log('were here')
		state.forEach(ui => {
			fetch("http://localhost:3000/ingredients", {
				headers: {
					"Content-Type": "application/json",
					Authorization: token
				}
			})
				.then(res => res.json())
				.then(json => {
					json.forEach(ing => {
						if (parseInt(ui.ingredient_id) === ing.id) {
							this.setState({ ingredients: [...this.state.ingredients, ing] })
						}
					})
				})
		})
	}

	// Responsible for creating a ingredient, user ingredient and a scan in the backend.
	scanHandler = e => {
		e.preventDefault()

		fetch("http://localhost:3000/scans", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				barcode: this.state.barcode,
				user_id: this.props.user.id
			})
		})
			.then(res => res.json())
			.then(json => console.log(json))
	}

	// Saves barcode to state on change of input field.
	changeHandler = e => {
		// console.log('change')
		this.setState({ barcode: e.target.value })
	}

	// Handles deleting user ingredient from user ingredient array.
	rerender = (object, index) => {
		console.log(object)

		// let newUserIngredientsArray = [...this.state.userIngredientsArray];
		// newUserIngredientsArray.splice(index, 1)

		let newIngredientsArray = [...this.state.ingredients]
		newIngredientsArray.splice(index, 1)

		this.setState({
			ingredients: newIngredientsArray
		})
	}

	render() {
		// console.log('render runs again')
		let groceries

		if (localStorage.getItem("token")) {
			groceries = this.state.ingredients.map(item => {
				return (
					<GroceryCard
						key={item.id}
						grocery={item}
						user={this.props.user}
						change={this.rerender}
						userIng={this.state.userIngredientsArray}
						ingredients={this.state.ingredients}
						cart={this.props.collectSelectedItems}
						selected={this.props.selectedItems}
						deselect={this.props.deselectItem}
					/>
				)
			})
		} else {
			groceries = (
				<h1 className="no-pantry">Login or Register to see your Pantry!</h1>
			)
		}

		return (
			<div className="div">
				<div className="search-bar">
					<h3>SCANAPE</h3>
					<form onSubmit={this.submitHandler}>
						<input
							type="text"
							onChange={this.changeHandler}
							value={this.state.searchTerm}
						/>
					</form>
					<form onSubmit={this.scanHandler}>
						<input
							type="text"
							autoFocus
							onChange={this.changeHandler}
							className="hidden-input"
							value={this.state.barcode}
						/>
					</form>
				</div>
				<div className="grocery-cont">{groceries}</div>
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
)(GroceryList)
