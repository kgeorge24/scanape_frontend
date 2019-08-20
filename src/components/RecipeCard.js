import React, { Component } from "react"
import "../css/RecipeCard.css"

export default class RecipeCard extends Component {
	render() {
		return (
			<a
				href={this.props.recipe.url}
				className="recipe-link"
				target="_blank"
				rel="noopener noreferrer"
			>
				<div className="recipe-card">
					<div className="image-div">
						<img src={this.props.recipe.image} alt="" />
					</div>
					<div className="recipe-name">
						<h1>{this.props.recipe.label}</h1>
					</div>
				</div>
			</a>
		)
	}
}
