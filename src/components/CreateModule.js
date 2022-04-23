import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import {backendPath} from "../path";
import Cookies from "universal-cookie";
const cookies = new Cookies();


class CreateModule extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      programme_id:'',
      module_id:'',
      module_leader:'',
      description:'',
      published_date:''
    };
  }

  componentDidMount() {
    axios.get(backendPath + '/api/programmes')
        .then(res => {
          this.setState({
            programmes: res.data
          });
        });
  }

  onChange = e => {
    console.log(e.target);
    this.setState({ [e.target.name]: e.target.value });
  };

  onDropClick = e => {
    this.setState({ programme_id: document.getElementById("progSelect").value});
  }

  onSubmit = async e => {
    e.preventDefault();
    let user = await axios.get(backendPath + '/api/users/' + cookies.get("TOKEN"))
    const data = {
      title: this.state.title,
      programme_id: this.state.programme_id,
      module_id: this.state.module_id,
      module_leader: user.data[0].user_id,
      description: this.state.description,
      published_date: this.state.published_date
    };

    axios
        .post(backendPath + '/api/modules', data)
        .then(res => {
          this.setState({
            title: '',
            programme_id: '',
            module_id: '',
            module_leader: '',
            description: '',
            published_date: ''
          })
          this.props.history.push('/show-module-list');
        })
        .catch(err => {
          console.log("Error in CreateModule!");
        })
  };

  render() {
    const programmes = this.state.programmes
    let programmeList;
    if (programmes) {
      programmeList = programmes.map((e, key) => {
        return <option key={key} value={e.programme_id} >{e.programme_id}</option>;
      })
    }

    return (
        <div className="CreateModule">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <br/>
                <Link to="/show-module-list" className="btn btn-outline-warning float-left">
                  Show Module List
                </Link>
              </div>
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Add Module</h1>
                <p className="lead text-center">
                  Create new module
                </p>

                <form noValidate onSubmit={this.onSubmit}>
                  <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Title of the Module'
                        name='title'
                        className='form-control'
                        value={this.state.title}
                        onChange={this.onChange}
                    />
                  </div>
                  <br/>

                  <div className='form-group'>
                    <select className="custom-select" id="progSelect" onChange={this.onDropClick}>
                      <option selected disabled hidden>Choose...</option>
                      {programmeList}
                    </select>
                  </div>

                  <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Module ID'
                        name='module_id'
                        className='form-control'
                        value={this.state.module_id}
                        onChange={this.onChange}
                    />
                  </div>

                  <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Describe the module'
                        name='description'
                        className='form-control'
                        value={this.state.description}
                        onChange={this.onChange}
                    />
                  </div>

                  <div className='form-group'>
                    <input
                        type='date'
                        placeholder='published date'
                        name='published_date'
                        className='form-control'
                        value={this.state.published_date}
                        onChange={this.onChange}
                    />
                  </div>

                  <input
                      type="submit"
                      className="btn btn-outline-warning btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default CreateModule;