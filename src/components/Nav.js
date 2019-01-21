import React,{ Component } from 'react';
import {Link} from 'react-router-dom'

export default class Nav extends Component {

    click = () => {
        localStorage.clear()
        // this.props.history.push('/login')
    }
    render(){


        let properBar;
        
        if (localStorage.getItem('token')){
            properBar = <div>
                <li className="nav-links"><Link to="/login" data-value="register" onClick={this.click}>Logout</Link></li>
                <li className="nav-name glow">Hi, {this.props.user.name}</li>
            </div>
        }else{
            properBar = <div>
                            <li className="nav-links"><Link to='/register' onClick={this.props.click} data-value="register">Register</Link></li>
                            <li className="nav-links"><Link to="/login" data-value="login" onClick={this.props.click}>Login</Link></li>
                        </div>
        }


        return(
            <nav className="nav-primary">
            <ul>
                {properBar}
                <li className="nav-links left"><Link to="/home" data-value="home" onClick={this.props.click}>Home</Link></li>
                <li className="nav-links left"><Link to="recipes" data-value="recipes">Recipes</Link></li>
                <li className="nav-links left"><Link to="grocerylist" data-value="grocerylist" onClick={this.props.click}>Pantry</Link></li>
            </ul>
        </nav>
        )
    }
}

