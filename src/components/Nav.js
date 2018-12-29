import React,{ Component } from 'react';

export default class Nav extends Component {

    click = () => {
        localStorage.clear()
        // this.props.history.push('/login')
    }
    render(){


        let properBar;
        
        if (localStorage.getItem('token')){
            properBar = <div>
                <li className="nav-links"><a href="/login" data-value="register" onClick={this.click}>Logout</a></li>
                <li className="nav-name glow">Hi, {this.props.user.name}</li>
            </div>
        }else{
            properBar = <div>
                            <li className="nav-links"><a href="register" data-value="register" onClick={this.props.click}>Register</a></li>
                            <li className="nav-links"><a href="login" data-value="login" onClick={this.props.click}>Login</a></li>
                        </div>
        }


        return(
            <nav className="nav-primary">
            <ul>
                {properBar}
                <li className="nav-links left"><a href="home" data-value="home" onClick={this.props.click}>Home</a></li>
                <li className="nav-links left"><a href="recipes" data-value="recipes">Recipes</a></li>
                <li className="nav-links left"><a href="grocerylist" data-value="grocerylist" onClick={this.props.click}>Pantry</a></li>
            </ul>
        </nav>
        )
    }
}

