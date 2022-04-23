import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import {backendPath} from "../path";
import Cookies from "universal-cookie";
const cookies = new Cookies();


class Login extends Component {
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

    var user_id = this.state.userId;
    var password_id = this.state.password;
    var basicAuth = 'Basic ' + btoa(user_id + ':' + password_id);

    axios.get(backendPath + '/api/users/'+user_id,  {
        headers: {
          withCredentials: true,
          authorization: basicAuth
        }
    }).then(function(response) {
      console.log('Authenticated');
      axios
          .get(backendPath + '/api/users/'+user_id)
          .then(res => {
            try {
              cookies.remove("TOKEN", { path: '/' });
            } catch (err) {

            }
            console.log(res.data);
            cookies.set("TOKEN", res.data[0]._id, {
              path: "/"
            })

            if (res.data[0].user_type === "prog") {
              window.location.href="/show-programmes/"+res.data._id;
            } else {
              window.location.href="/show-module-list/"+ res.data._id;
            }
          })
          .catch(err => {
            console.log("Error from Login");
          });
    }).catch(function(error) {
      console.log('Error on Authentication');
    });
  };

  render() {
      return (
        <div className="Login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">

                <h1 className="display-4 text-center">Login</h1>

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
              </div>
              <div className="col-md-8 m-auto">
                <Link to="/register" className="btn btn-outline-warning btn-block mt-4">
                  Register
                </Link>
                <br />
                <br />
                <hr />
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default Login;