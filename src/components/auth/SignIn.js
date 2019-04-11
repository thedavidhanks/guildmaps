import React, { Component } from 'react';

class SignIn extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        };
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }
    render() {
      return (
        <div className="container-fluid">
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange}/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChange}/>
            </div>

            <button type="submit" className="btn btn-primary">Sign In</button>
          </form>

        </div>
      );
    }
};

export default SignIn;
