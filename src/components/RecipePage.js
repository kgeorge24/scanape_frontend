import React, { Component } from 'react';

export default class RecipePage extends Component {
    state = {
        recipe: this.props.recipe
    }
    render(){
        // console.log(this.state.recipe.ingredients[0].text)

        const ingredients = this.state.recipe.ingredients.map( ingredients => {
            return <p>{ingredients.text}</p>
        })
        return(
            <div className="recipe-page">
                <h1>{this.props.recipe.label}</h1>
                <img src={this.props.recipe.image} alt=""/>
                {ingredients}
                <a href={this.state.recipe.url}>Click For Full Recipe</a>
            </div>
        )
    }
}