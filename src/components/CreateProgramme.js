import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import Cookies from "universal-cookie";
const cookies = new Cookies();


class CreateProgramme extends Component {
    constructor() {
        super();
        this.state = {
            programme_id:'',
            title: '',
            programme_leader:'',
            description:'',
            published_date:''
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = async e => {
        e.preventDefault();

        let user = await axios.get('http://localhost:8082/api/users/' + cookies.get("TOKEN"))

        const data = {
            title: this.state.title,
            programme_id: this.state.programme_id,
            programme_leader: user.data[0].user_id,
            description: this.state.description,
            published_date: this.state.published_date
        };

        axios
            .post('http://localhost:8082/api/programmes', data)
            .then(res => {
                this.setState({
                    title: '',
                    programme_id: '',
                    programme_leader: '',
                    description: '',
                    published_date: ''
                })
                this.props.history.push('/show-programmes');
            })
            .catch(err => {
                console.log(err);
                console.log("Error in CreateProgramme!");
            })
    };

    render() {
        return (
            <div className="CreateModule">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br />
                            <Link to="/show-programmes" className="btn btn-outline-warning float-left">
                                Show Programme List
                            </Link>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Add Programme</h1>
                            <p className="lead text-center">
                                Create new programme
                            </p>

                            <form noValidate onSubmit={this.onSubmit}>
                                <div className='form-group'>
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
                                    <input
                                        type='text'
                                        placeholder='Describe the programme'
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

export default CreateProgramme;