import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import {backendPath} from "../path";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class CreateGoal extends Component {
    constructor() {
        super();
        this.state = {
            obj_id: '',
            obj_name:'',
            module_ids:'',
            goal_id:''
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = async e => {
        e.preventDefault();

        let collectionLength = 0;
        await axios
            .get(backendPath + '/api/goals')
            .then(res => {
                collectionLength = res.data.length;
            })

        let obj = window.location.pathname.split('/')[2];
        const data = {
            goal_id: collectionLength,
            goal_name: this.state.goal_name,
            programme_id: obj
        };

        axios
            .post(backendPath + '/api/goals', data)
            .then(res => {
                this.setState({
                    goal_id: '',
                    goal_name: '',
                    programme_id: ''
                })
                this.props.history.push(`/show-programmes/${cookies.get("TOKEN")}`);
            })
            .catch(err => {
                console.log("Error in CreateGoal!");
            })
    };

    render() {
        const idMap = `/show-programme/${cookies.get("PROG")}`;

        return (
            <div className="CreateModule">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br />
                            <Link to={idMap} className="btn btn-outline-warning float-left">
                                Programmes
                            </Link>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Add Goal</h1>
                            <p className="lead text-center">
                                Add new goal
                            </p>

                            <form noValidate onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Goal Description'
                                        name='goal_name'
                                        className='form-control'
                                        value={this.state.goal_name}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <br />

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

export default CreateGoal;