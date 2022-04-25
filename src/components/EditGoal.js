import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import {backendPath} from "../path";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class EditGoal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goal_id: '',
            goal_name:'',
            programme_id:'',
        };
    }

    componentDidMount() {
        let obj = window.location.pathname.split('/')[2];
        axios
            .get(backendPath + '/api/goals/' + obj)
            .then(res => {
                this.setState({
                    goal_id: res.data[0].goal_id,
                    goal_name: res.data[0].goal_name,
                    programme_id: res.data[0].programme_id
                })
            })
            .catch(err => {
                console.log("Error from EditGoal");
            })
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = async e => {
        e.preventDefault();

        const data = {
            goal_id: this.state.goal_id,
            goal_name: this.state.goal_name,
            programme_id: this.state.programme_id
        };

        let obj = window.location.pathname.split('/')[2];

        axios
            .put(backendPath + '/api/goals/' + obj, data)
            .then(res => {
                this.props.history.push(`/show-programmes/${cookies.get("TOKEN")}`);
            })
            .catch(err => {
                console.log("Error in EditGoal!");
            })
    };

    render() {
        const idMap = `/show-programmes/${cookies.get("TOKEN")}`
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
                            <h1 className="display-4 text-center">Edit Goal</h1>
                            <p className="lead text-center">
                                Edit existing goal
                            </p>

                            <form noValidate onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Goal'
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

export default EditGoal;