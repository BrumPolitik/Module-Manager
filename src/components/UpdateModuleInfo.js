import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {backendPath} from "../path";
import '../App.css';
import Cookies from "universal-cookie";
const cookies = new Cookies();

class UpdateModuleInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      programme_id:'',
      module_id:'',
      description:''
    };
  }

  componentDidMount() {
    axios.get(backendPath + '/api/programmes')
        .then(res => {
          this.setState({
            programmes: res.data
          });
        });
    axios
      .get(backendPath + '/api/modules/'+this.props.match.params.id)
      .then(res => {
        this.setState({
          title: res.data[0].title,
          programme_id: res.data[0].programme_id,
          module_id: res.data[0].module_id,
          description: res.data[0].description
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
      description: this.state.description
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
    const programmes = this.state.programmes
    let programmeList;
    if (programmes) {
      programmeList = programmes.map((e, key) => {
        return <option key={key} value={e.programme_id} >{e.programme_id}</option>;
      })
    }

    if (cookies.get("TOKEN")) {
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
              <select className="custom-select" id="progSelect" onChange={this.onDropClick}>
                <option selected>{this.state.programme_id}</option>
                {programmeList}
              </select>
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
            <label htmlFor="description">Description</label>
              <textarea
                placeholder='Describe the module'
                name='description'
                className='form-control'
                rows = {3}
                value={this.state.description}
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Module</button>
            </form>
          </div>

        </div>
      </div>
    );
    } else {
      return (<h3>User Not Authenticated</h3>);
    }
  }
}

export default UpdateModuleInfo;