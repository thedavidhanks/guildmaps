import React, { Component } from 'react';

class SignUp extends Component {
    constructor(){
        super();
        this.state = {
            firstName: '',
            lastName: '', 
            email: '',
            password: '',
            passwordCheck: ''
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
        <div className="container">
            <form onSubmit={this.handleSubmit}>
            <h5>Sign Up</h5>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange}/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">First Name</label>
              <input type="text" className="form-control" id="firstName" placeholder="first name" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Last Name</label>
              <input type="text" className="form-control" id="lastName" placeholder="last name" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" id="passwordCheck" placeholder="Confirm password" onChange={this.handleChange}/>
            </div>

            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>

        </div>
      );
    }
};

export default SignUp;