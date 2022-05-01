import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import {backendPath} from "../path";
import Cookies from "universal-cookie";
const cookies = new Cookies();


class CreateProgramme extends Component {
    constructor(props) {
        super(props);
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

        let user = await axios.get(backendPath + '/api/users/' + cookies.get("TOKEN"))

        if (user.data[0].prog === true) {

            const data = {
                title: this.state.title,
                programme_id: this.state.programme_id,
                programme_leader: user.data[0].user_id,
                description: this.state.description,
                published_date: new Date()
            };

            axios
                .post(backendPath + '/api/programmes', data)
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
        } else {
            alert("Invalid User");
        }
    };

    render() {
        if (cookies.get("TOKEN")) {
            return (
                <div className="CreateModule">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <br/>
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
                                    <br/>

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
                                    <textarea
                                        type='text'
                                        placeholder='Describe the programme'
                                        name='description'
                                        className='form-control'
                                        rows={3}
                                        value={this.state.description}
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
        } else {
            return (<h3>User Not Authenticated</h3>);
        }
    }
}

export default CreateProgramme;