import React, { Component } from 'react';
import '../App.css';
import {Link} from "react-router-dom";
import axios from 'axios';
import {backendPath} from "../path";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      user_id: '',
      password_id:'',
      user_type: ''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  onSubmit = e => {
    e.preventDefault();

    const data = {
      user_id: this.state.userId,
      password_id: this.state.password,
      user_type: ''
    };

    axios
      .post(backendPath + '/api/users', data)
      .then(res => {
        console.log("Here");
        this.setState({
          user_id: '',
          password_id: '',
          user_type: ''
        });
        this.props.history.push('/');
      })
      .catch(err => {
        alert("Invalid Username")
        console.log("Error in Register!");
      })
  };

  render() {
      return (
        <div className="Register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Register</h1>

                <form noValidate onSubmit={this.onSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='User ID'
                      name='userId'
                      className='form-control'
                      value={this.state.userId}
                      onChange={this.onChange}
                    />
                  </div>
                  <br />

                  <div className='form-group'>
                    <input
                      type='password'
                      placeholder='Password'
                      name='password'
                      className='form-control'
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>

                  <input
                      type="submit"
                      className="btn btn-outline-warning btn-block mt-4"
                  />
                </form>
                <Link to="/" className="btn btn-outline-warning btn-block mt-4">Return to Login</Link>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default Register;