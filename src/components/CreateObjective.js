import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import {backendPath} from "../path";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class CreateObjective extends Component {
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
            .get(backendPath + '/api/objectives')
            .then(res => {
                collectionLength = res.data.length;
            })

        const data = {
            obj_id: collectionLength,
            obj_name: this.state.obj_name,
            module_ids: cookies.get("MODULE"),
            goal_id: cookies.get("GOAL")
        };

        axios
            .post(backendPath + '/api/objectives', data)
            .then(res => {
                this.setState({
                    obj_id: '',
                    obj_name: '',
                    module_ids: '',
                    goal_id: ''
                })
                this.props.history.push(`/show-objectives/${cookies.get("MODULE") + ':' + cookies.get("GOAL")}`);
            })
            .catch(err => {
                console.log("Error in CreateObjective!");
            })
    };

    render() {
        const idMap = `/map-module/${cookies.get("MODULE")}`
        return (
            <div className="CreateModule">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br />
                            <Link to={idMap} className="btn btn-outline-warning float-left">
                                Objectives
                            </Link>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Add Objective</h1>
                            <p className="lead text-center">
                                Edit existing objective
                            </p>

                            <form noValidate onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Objective'
                                        name='obj_name'
                                        className='form-control'
                                        value={this.state.obj_name}
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

export default CreateObjective;