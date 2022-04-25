import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {backendPath} from "../path";
import '../App.css';

class UpdateModuleInfo extends Component {
  constructor(props) {
    super(props);
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
    axios
      .get(backendPath + '/api/modules/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          title: res.data[0].title,
          programme_id: res.data[0].programme_id,
          module_id: res.data[0].module_id,
          module_leader: res.data[0].module_leader,
          description: res.data[0].description,
          published_date: res.data[0].published_date
        })
      })
      .catch(err => {
        console.log("Error from UpdateModuleInfo");
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      title: this.state.title,
      programme_id: this.state.programme_id,
      module_id: this.state.module_id,
      module_leader: this.state.module_leader,
      description: this.state.description,
      published_date: this.state.published_date
    };

    axios
      .put(backendPath + '/api/modules/'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/show-module/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in UpdateModuleInfo!");
      })
  };


  render() {

    return (
      <div className="UpdateModuleInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/show-module-list" className="btn btn-outline-warning float-left">
                  Show Module List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Module</h1>
              <p className="lead text-center">
                  Update Module's Info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor="title">Title</label>
              <input
                type='text'
                placeholder='Title of the Module'
                name='title'
                className='form-control'
                value={this.state.title}
                onChange={this.onChange}
              />
            </div>
            <br />

            <div className='form-group'>
            <label htmlFor="programme_id">Programme ID</label>
              <input
                type='text'
                placeholder='Programme ID'
                name='programme_id'
                className='form-control'
                value={this.state.programme_id}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="module_id">Module ID</label>
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
            <label htmlFor="module_leader">Module Leader</label>
              <input
                type='text'
                placeholder='Module Leader'
                name='module_leader'
                className='form-control'
                value={this.state.module_leader}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="description">Description</label>
              <textarea
                type='text'
                placeholder='Describe the module'
                name='description'
                className='form-control'
                rows = {3}
                value={this.state.description}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="published_date">Published Date</label>
              <input
                type='date'
                placeholder='published_date'
                name='published_date'
                className='form-control'
                value={this.state.published_date}
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Module</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdateModuleInfo;