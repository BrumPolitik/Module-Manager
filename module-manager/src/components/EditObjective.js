import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import Cookies from "universal-cookie";
const cookies = new Cookies();

class EditObjective extends Component {
    constructor() {
        super();
        this.state = {
            obj_id: '',
            obj_name:'',
            module_ids:'',
            goal_id:''
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:8082/api/objectives/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    obj_id: res.data[0].obj_id,
                    obj_name: res.data[0].obj_name,
                    module_ids: res.data[0].module_ids,
                    goal_id: res.data[0].goal_id
                })
            })
            .catch(err => {
                console.log("Error from EditObjective");
            })
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = async e => {
        e.preventDefault();

        const data = {
            obj_id: this.state.obj_id,
            obj_name: this.state.obj_name,
            module_ids: this.state.module_ids,
            goal_id: this.state.goal_id
        };

        axios
            .put('http://localhost:8082/api/objectives', data)
            .then(res => {
                this.props.history.push(`/show-objectives/${cookies.get("MODULE") + ':' + cookies.get("GOAL")}`);
            })
            .catch(err => {
                console.log("Error in CreateObjective!");
            })
    };

    render() {
        const idMap = `/show-objective/${cookies.get("MODULE")}`
        return (
            <div className="CreateModule">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br />
                            <Link to={idMap} className="btn btn-outline-warning float-left">
                                Module Mapping
                            </Link>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Edit Objective</h1>
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

export default EditObjective;