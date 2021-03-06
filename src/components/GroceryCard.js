import React, { Component } from "react"
import "../css/GroceryCard.css"
import { fetchItemCount } from "../actions"
import { connect } from "react-redux"

class GroceryCard extends Component {
	state = {
		quantity: "",
		class: "ingredient-card",
		clicked: false
	}

	componentDidMount() {
		this.props.fetchItemCount(this.props.grocery.id)
	}

	// Decreases quantity on button click
	decreaseQuantityOFItem = () => {
		const { quantity } = this.state

		fetch(`http://localhost:3000/ingredients/${this.props.grocery.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ quantity: quantity - 1 })
		})
			.then(res => res.json())
			.then(json => this.setState({ quantity: json.quantity }))
	}

	// Increases quantity on button click
	increaseQuantityOfItem = () => {
		fetch(`http://localhost:3000/ingredients/${this.props.grocery.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ quantity: this.state.quantity + 1 })
		})
			.then(res => res.json())
			.then(json => this.setState({ quantity: json.quantity }))
	}

	// Changes color of grocery item on click of image.
	selectGroceryItem = () => {
		const { selected, cart, grocery, deselect } = this.props

		// this.props.cart(this.props.grocery)

		if (this.state.class === "ingredient-card") {
			this.setState({ class: "ingredient-card green" })
			cart(grocery)
		} else {
			this.setState({ class: "ingredient-card" })
			selected.forEach((item, index) => {
				if (grocery === item) {
					console.log("we have a match")
					deselect(index)
				}
			})
		}
	}

	// deletes user ingredient from database
	deleteUserIngredient = () => {
		let token = localStorage.getItem("token")

		fetch("http://localhost:3000/user_ingredients", {
			headers: {
				"Content-Type": "application/json",
				Authorization: token
			}
		})
			.then(res => res.json())
			.then(json => {
				json.forEach(userIngredient => {
					if (
						this.props.user.id === parseInt(userIngredient.user_id) &&
						this.props.grocery.id === parseInt(userIngredient.ingredient_id)
					) {
						fetch(
							`http://localhost:3000/ingredients/${userIngredient.ingredient_id}`,
							{
								method: "DELETE",
								headers: {
									"Content-Type": "application/json",
									Authorization: token
								}
							}
						)
							.then(res => res.json())
							.then(json => {
								const { ingredients } = this.props

								ingredients.forEach((ingredient, index) => {
									if (
										parseInt(ingredient.id) ===
										parseInt(userIngredient.ingredient_id)
									) {
										console.log("done")
										this.props.change(ingredient, index)

										fetch(
											`http://localhost:3000/user_ingredients/${userIngredient.id}`,
											{
												method: "DELETE",
												headers: {
													"Content-Type": "application/json",
													Authorization: token
												}
											}
										)
									}
								})
							})
					}
				})
			})
	}

	truncateTitle = title => {
		let newTitle = title.length > 20 ? title.slice(0, 20) + "..." : title
		return newTitle
	}

	render() {
		console.log(this.props)
		const { title, picture, id } = this.props.grocery
		const quantity = this.state.quantity
		return (
			<div className={this.state.class} data-id={id}>
				<button className="delete-button" onClick={this.deleteUserIngredient}>
					X
				</button>
				<img src={picture} alt="" onClick={this.selectGroceryItem} />
				<div className="ingredient-details">
					<h4>{this.truncateTitle(title)}</h4>
					<div className="quantity-controls">
						<button className="button" onClick={this.decreaseQuantityOFItem}>
							-
						</button>
						<button className="button" onClick={this.increaseQuantityOfItem}>
							+
						</button>
						<p>
							Quantity:{" "}
							{this.props.itemQuantity ? this.props.itemQuantity.quantity : 0}
						</p>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state
}

export default connect(
	mapStateToProps,
	{ fetchItemCount }
)(GroceryCard)
