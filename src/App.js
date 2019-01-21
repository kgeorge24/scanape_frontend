import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage'
import { Route, Switch } from 'react-router-dom';
import Nav from './components/Nav'
import Login from './components/Login';
import Register from './components/Register';
import GroceryList from './components/GroceryList';
import Recipes from './components/Recipes';
import { withRouter } from 'react-router-dom'


class App extends Component {
  state = {
    user: {},
    class: "downArrow bounce",
    change: false,
    currentRecipe: [],
    clicked: false,
    selectedItems: []
  }



  // Fecthes the current user and saves it to the state under the property "user".
  componentDidMount(){
    let token = localStorage.getItem('token')
    
    if(token){
      fetch('http://localhost:3000/current_user', {
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json',
          Authorization: token
        }
      })
      .then( res => res.json())
      .then(json => this.setState({ user: json}))
    }
  }



  // Handles when someone signs up for Scanape.
  registerHandler = (event, formInfo) => {
    event.preventDefault()

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            Accepts: 'application/json', 
        },
        body: JSON.stringify({
            name: formInfo.name,
            username: formInfo.username,
            password: formInfo.password
        })
    })
    .then( res => res.json())
    .then( json => {
      if(json.jwt){
        localStorage.setItem('token', json.jwt)
        this.setState({ user: json})
      }
    })
    this.props.history.push('/home')
  }



  // Handles when a user logs in to Scanape.
  loginHandler = (e, formInfo) => {
    e.preventDefault()

    fetch('http://localhost:3000/login', {
        method: 'POST', 
        headers: { 
          'Content-type': 'application/json',
          'Accepts': "application/json"
      }, 
      body: JSON.stringify({
        username: formInfo.username,
        password: formInfo.password
      })
    })
    .then( res => res.json())
    .then( json => {
      if(json.jwt){
        localStorage.setItem('token', json.jwt)
        this.setState({ user: json})
      }
    })
    this.props.history.push('/home')
  }



  // Handles making the arrow dissapear on scroll
  scrollHandler = (event) => {
    this.setState({ class: "hidden-input"})
  }

  setCurrentRecipe = (recipe) => {
    this.setState({ 
        currentRecipe: recipe,
        clicked: true
     }, () => this.props.history.push('/info'))
}

  gives = () => {
    return this.state.currentRecipe
  }

  collectSelectedItems = (item) => {
    console.log('reached')
    this.setState({ selectedItems: [...this.state.selectedItems, item]}, () => console.log(this.state.selectedItems))
}

deleteSelectedItem = (index) => {
  let newIngredientsArray = [...this.state.selectedItems];
        newIngredientsArray.splice(index, 1)
        
        this.setState({ 
            selectedItems: newIngredientsArray
         }, () => console.log(this.state.selectedItems))
}

  render() {  
    // console.log(this.state.currentRecipe)
    return (
      <div onScroll={this.scrollHandler} style={{height: '100vh', overflow: 'scroll'}} className="header">
        <Nav user={this.state.user}/>
          <Switch>
            <Route path='/login' 
            render={() => (<Login loginHandler={this.loginHandler}/>)}/>

            <Route path='/register' 
            render={() => (<Register submitHandler={this.registerHandler}/>)}/>

            <Route path='/home' 
            render={() => (<LandingPage class={this.state.class} scrollHandler={this.scrollHandler}/>)}/>

            <Route path='/grocerylist' 
            render={() => (<GroceryList user={this.state.user} collectSelectedItems={this.collectSelectedItems} selectedItems={this.state.selectedItems} deselectItem={this.deleteSelectedItem}/>)}/>

            <Route exact path='/recipes' render={() => (<Recipes selectRecipe={this.setCurrentRecipe} currentRecipe={this.state.currentRecipe} clicked={this.state.clicked} items={this.state.selectedItems}/>)}/>

            {/* <Route exact path='/info' render={() => (<RecipePage recipe={this.gives()}/>)}/> */}
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
