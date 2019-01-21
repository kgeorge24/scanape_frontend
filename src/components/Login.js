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
                <div className="form-container">
                    <form className='form' onSubmit={(e) => this.props.loginHandler(e, this.state)}>
                    <div className="form-heading">
                        <h1>Scanape</h1>
                    </div>

                    <div className="input-holder">
                        <input className="form-input" placeholder="Username" value={this.state.username} name="username" onChange={this.changeHandler}></input>
                        <br></br>
                        <input type="password" className="form-input" placeholder="Password" value={this.state.password} name="password" onChange={this.changeHandler}></input>
                        <br></br>
                        <button className='form-submit'>Login</button>
                    </div>
                    </form>
                    </div>
                </header>
            </div>
        )
    }
}