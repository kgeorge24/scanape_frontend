import React, { Component } from 'react';
import RecipeCard from './RecipeCard';

export default class Recipes extends Component {
    constructor(){
        super()
        this.state = {
            searchTerm: "",
            recipes: [],
            currentRecipe: [],
            clicked: false
        }
    }

    changeHandler = (e) => {
        this.setState({ searchTerm: e.target.value})

        // console.log(this.state)

    }


    submitHandler = (e) => {
        e.preventDefault()
        const searchTerm = this.state.searchTerm
        console.log(searchTerm)

        fetch(`https://api.edamam.com/search?q=${searchTerm}&app_id=f2e29b18&app_key=618653b4bcb9eae9d0711ac20220e002`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( res => res.json())
        .then(json => this.setState({ recipes: json.hits}, () => console.log(json.hits)))
    }

    setCurrentRecipe = (recipe) => {
        this.setState({ currentRecipe: recipe })
    }

    render(){

        const recipeCard = this.state.recipes.map( rec => {
            // console.log(rec.recipe)
            return <RecipeCard key={rec.recipe.label} recipe={rec.recipe} selectRecipe={this.props.selectRecipe}/>
        })

        return(
            <div className="recipe">
                <h1>Recipes</h1>
                <form onSubmit={this.submitHandler}>
                    <input type='text' onChange={this.changeHandler} value={this.state.searchTerm}></input>
                    <br></br>
                    <button onClick={this.submitHandler}>Search</button>
                </form>

                <div className="recipe-cont">
                    {recipeCard}
                </div>
            </div>
        )
    }
}