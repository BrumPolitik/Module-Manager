import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {backendPath} from "../path";
import '../App.css';

class EditProgramme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            programme_id:'',
            programme_leader:'',
            description:'',
            published_date:''
        };
    }

    componentDidMount() {
        axios
            .get(backendPath + '/api/programmes/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    title: res.data[0].title,
                    programme_id: res.data[0].programme_id,
                    programme_leader: res.data[0].programme_leader,
                    description: res.data[0].description,
                    published_date: res.data[0].published_date
                })
            })
            .catch(err => {
                console.log("Error from EditProgramme");
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
            programme_leader: this.state.programme_leader,
            description: this.state.description,
            published_date: this.state.published_date
        };

        axios
            .put(backendPath + '/api/programmes/'+this.props.match.params.id, data)
            .then(res => {
                this.props.history.push('/show-programme/'+this.props.match.params.id);
            })
            .catch(err => {
                console.log("Error in EditProgramme!");
            })
    };


    render() {

        return (
            <div className="UpdateModuleInfo">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br />
                            <Link to="/show-programmes" className="btn btn-outline-warning float-left">
                                Show Programmes
                            </Link>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Edit Programme</h1>
                            <p className="lead text-center">
                                Update Programme's Info
                            </p>
                        </div>
                    </div>

                    <div className="col-md-8 m-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className='form-group'>
                                <label htmlFor="title">Title</label>
                                <input
                                    type='text'
                                    placeholder='Title of the Programme'
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
                                <label htmlFor="module_leader">Module Leader</label>
                                <input
                                    type='text'
                                    placeholder='Programme Leader'
                                    name='programme_leader'
                                    className='form-control'
                                    value={this.state.programme_leader}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="description">Description</label>
                                <textarea
                                    type='text'
                                    placeholder='Describe the programme'
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

export default EditProgramme;