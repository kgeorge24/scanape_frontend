import React, { Component } from 'react';

export default class GroceryCard extends Component {
    state = {
        quantity: "",
        class: "ingredient-card",
        clicked: false,
    }


    
    // Sets proper quantity of grocery item.
    componentDidMount(){
        fetch(`http://localhost:3000/ingredients/${this.props.grocery.id}`)
        .then( res => res.json())
        .then( json => this.setState({ quantity: json.quantity}))
    }
    


    // Decreases quantity on button click
    decreaseHandler = () => {
        const { quantity } = this.state

        fetch(`http://localhost:3000/ingredients/${this.props.grocery.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: quantity - 1})
        }).then( res => res.json())
        .then( json => this.setState({ quantity: json.quantity}))
    }



    // Increases quantity on button click
    increaseHandler = () => {
        fetch(`http://localhost:3000/ingredients/${this.props.grocery.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: this.state.quantity + 1})
        }).then( res => res.json())
        .then( json => this.setState({ quantity: json.quantity}))
    }



    // Changes color of grocery item on click of image.
    changeColor = () => {
        const { selected } = this.props
        console.log(selected)
        this.props.cart(this.props.grocery)

        selected.map( item => {
            // console.log(item)
            if(this.props.grocery === item){
                console.log('im in here already')
            }else{
                console.log('ive been added')
            }
        })

        if(this.state.class === "ingredient-card"){
            this.setState({ class: "ingredient-card green"})
        }else{
            this.setState({ class: "ingredient-card"})
        }

    }



    // deletes user ingredient from database
    deleteCard = () => {
        let token = localStorage.getItem('token')

        fetch('http://localhost:3000/user_ingredients',{
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).then( res => res.json())
        .then( json => {
            json.forEach( userIngredient => {

                if(this.props.user.id === parseInt(userIngredient.user_id) && this.props.grocery.id === parseInt(userIngredient.ingredient_id)){
                    fetch(`http://localhost:3000/ingredients/${userIngredient.ingredient_id}`,{
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: token
                        }
                    })
                    .then( res => res.json())
                    .then( json => {

                        const { ingredients } = this.props

                        ingredients.map( (ingredient, index) => {
                            if(parseInt(ingredient.id) === parseInt(userIngredient.ingredient_id)){
                                console.log('done')
                                this.props.change(ingredient, index)

                                fetch(`http://localhost:3000/user_ingredients/${userIngredient.id}`,{
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: token
                                    }
                                })
                            }
                        })
                    })

                    // .then( res => res.json())
                    // .then( json => {
                        
                    //     const { userIng } = this.props
                        
                    //     userIng.map( (ingredient, index) => { 

                    //         console.log(parseInt(ingredient.ingredient_id), parseInt(userIngredient.ingredient_id))   
                            
                    //         if(parseInt(ingredient.ingredient_id) === parseInt(userIngredient.ingredient_id)){
                    //             console.log('weve reached')

                    //             this.props.change(ingredient, index)
                    //         }else{
                    //             console.log('didnt reach yet')
                    //         }
                    //     })                                
                    // })
                }
            })
        })
    }

    render(){

        const { title, picture, id} = this.props.grocery
        
        const quantity = this.state.quantity
        
        return(
            <div className={this.state.class} data-id={id}>
                <button className="delete-button" onClick={this.deleteCard}>X</button>
                <img src={picture} alt="" onClick={this.changeColor} ></img>
                    <div className="ingredient-details">
                        <h3>{title}</h3>
                        <button className="button" onClick={this.decreaseHandler}>-</button><button className="button" onClick={this.increaseHandler}>+</button>
                        <br></br>
                        <p>Quantity: {quantity}</p>
                    </div>
            </div>
        )
    }
}