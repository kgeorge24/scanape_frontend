import React, { Component } from "react"
import RecipeCard from "./RecipeCard"
import "../css/Recipe.css"

export default class Recipes extends Component {
	constructor() {
		super()
		this.state = {
			searchTerm: "",
			recipes: [],
			currentRecipe: [],
			clicked: false,
			toggleList: false,
			listClass: "unselected-items"
		}
	}

	changeHandler = e => {
		this.setState({ searchTerm: e.target.value })

		// console.log(this.state)
	}

	submitHandler = e => {
		e.preventDefault()
		const searchTerm = this.state.searchTerm
		console.log(searchTerm)

		fetch(
			`https://api.edamam.com/search?q=${searchTerm}&app_id=f2e29b18&app_key=618653b4bcb9eae9d0711ac20220e002&from=0&to=30`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(res => res.json())
			.then(json =>
				this.setState({ recipes: json.hits }, () => console.log(json.hits))
			)
	}

	setCurrentRecipe = recipe => {
		this.setState({ currentRecipe: recipe })
	}

	toggleList = () => {
		this.state.toggleList === false
			? this.setState({ toggleList: true })
			: this.setState({ toggleList: false })
	}

	render() {
		const recipeCard = this.state.recipes.map(rec => {
			return (
				<RecipeCard
					key={rec.recipe.label}
					recipe={rec.recipe}
					selectRecipe={this.props.selectRecipe}
				/>
			)
		})

		const items = this.props.items.map((item, index) => {
			return (
				<div>
					<p>{item.title}</p>
				</div>
			)
		})

		const selectedList = () => {
			if (this.props.items.length !== 0) {
				return (
					<div className="selected-items" id="selected">
						<div>
							<h4>Selected Items</h4>
						</div>
						<div className="selectedItems">{items}</div>
					</div>
				)
			} else {
				return (
					<div className="selected-items" id="selected">
						<h4>
							Please select ingredients in your pantry that you want to use.
						</h4>
					</div>
				)
			}
		}

		const showSelectedList = () => {
			return this.state.toggleList === true ? selectedList() : null
		}

		return (
			<div className="recipe" id="recipe">
				<div className="search-bar">
					<h3>SCANAPE</h3>
					<form onSubmit={this.submitHandler}>
						<input
							type="text"
							onChange={this.changeHandler}
							value={this.state.searchTerm}
						/>
					</form>
					<button onClick={this.toggleList}>
						<img src={require("../img/list.png")} alt="" />
					</button>
				</div>
				{showSelectedList()}
				<div className="recipe-cont">{recipeCard}</div>
			</div>
		)
	}
}
