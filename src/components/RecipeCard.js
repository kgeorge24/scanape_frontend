import React, { Component } from 'react';
// import RecipePage from './RecipePage'

export default class RecipeCard extends Component {
    render(){
        
        return(
            <a href={this.props.recipe.url} className="recipe-link" target="_blank" rel="noopener noreferrer">
            <div className="recipe-card">
                <div className="recipe-name">
                    <h1>{this.props.recipe.label}</h1>
                </div>
                <div className="image-div">
                <img src={this.props.recipe.image} alt=""></img>
                </div>
                <p>Prep-Time: {this.props.recipe.totalTime} min</p>
                <p>Calories: {Math.round(this.props.recipe.calories)}</p>
            </div></a>
        )
    }
}