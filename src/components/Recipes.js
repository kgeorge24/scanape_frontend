import React, { Component } from 'react';
import RecipeCard from './RecipeCard';
import GroceryCard from './GroceryCard'

export default class Recipes extends Component {
    constructor(){
        super()
        this.state = {
            searchTerm: "",
            recipes: [],
            currentRecipe: [],
            clicked: false,
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

        fetch(`https://api.edamam.com/search?q=${searchTerm}&app_id=f2e29b18&app_key=618653b4bcb9eae9d0711ac20220e002&from=0&to=30`, {
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

        const items = this.props.items.map( (item, index) => {
            return <div>
                <p>{index + 1}. {item.title}</p>
            </div>
        })

        const selectedList = () => {
            console.log(this.props.items.length)
            if (this.props.items.length !== 0) {
                console.log('hi')
                return <div>
                    <div className="selectedItems-heading">
                    <h3>Selected Items</h3>
                </div>
                <div className="selectedItems">
                    {items}
                </div>
                </div>
            }else{
                console.log('empty')
            }
        }
        return(
            <div className="recipe">
                <h1>Recipes</h1>
                {selectedList()}
                <form onSubmit={this.submitHandler}>
                    <input type='text' onChange={this.changeHandler} value={this.state.searchTerm}></input>
                    <br></br>
                    <button onClick={this.submitHandler}>Search</button>
                </form>

                {/* <h3 className="pagination" onClick>Previous<br></br>Page</h3>
                <h3 className="pagination right" onClick>Next<br></br>Page</h3> */}
                <div className="recipe-cont">
                    {recipeCard}
                </div>
            </div>
        )
    }
}