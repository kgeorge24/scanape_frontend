import React, { Component } from 'react';


export default class Login extends Component {
    state = {
        username: "",
        password: ""
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

  


    render(){
        return(
            <div>
                <header >
                {/* <Nav /> */}
                <div className="form-container">
                    <form className='form' onSubmit={(e) => this.props.loginHandler(e, this.state)}>
                    <h1>Login</h1>
                        <input className="form-input" placeholder="Username" value={this.state.username} name="username" onChange={this.changeHandler}></input>
                        <br></br>
                        <input className="form-input" placeholder="Password" value={this.state.password} name="password" onChange={this.changeHandler}></input>
                        <br></br>
                        <button className='form-submit'>Login</button>
                    </form>
                    </div>
                </header>
            </div>
        )
    }
}