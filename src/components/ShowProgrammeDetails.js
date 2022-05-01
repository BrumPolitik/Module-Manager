import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import {backendPath} from "../path";
import Cookies from "universal-cookie";
import {removeCookie} from "../removeCookie";
const cookies = new Cookies();

class showProgrammeDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            programme: {}
        };
    }

    componentDidMount() {
        axios
            .get(backendPath + '/api/programmes/'+ this.props.match.params.id)
            .then(res => {
                this.setState({
                    programme: res.data[0]
                })

            })
            .catch(err => {
                console.log("Error from ShowProgrammeDetails");
            })
    };

    onDeleteClick (id) {
        axios
            .delete(backendPath + '/api/programmes/'+ id)
            .then(res => {
                axios
                    .get(backendPath + "/api/goals/" + this.state.programme.programme_id)
                    .then(res => {
                        for (const goal of res.data) {
                            axios.delete(backendPath + "/api/goals/" + goal._id)
                        }
                    }).catch(err => {})
                axios
                    .get(backendPath + "/api/modules/" + this.state.programme.programme_id)
                    .then(res => {
                        console.log(res);
                        for (const module of res.data) {
                            axios
                                .get(backendPath + "/api/objectives/" + module._id)
                                .then(res => {
                                    for (const objective of res.data) {
                                        axios.delete(backendPath + "/api/objectives/" + objective._id)
                                    }
                                }).catch(err => {})
                            axios.delete(backendPath + "/api/modules/" + module._id)
                        }
                    }).catch(err => {})
                this.props.history.push("/show-programmes");
            })
            .catch(err => {
                console.log("Error form ShowProgrammeDetails_deleteClick");
            })
    };

    onModuleClick(id) {
        removeCookie("PROG");
        cookies.set("PROG", id, {path: "/"});
        window.location.href = `/show-module-list`;
    }


    render() {

        const programme = this.state.programme;
        let date = new Date(programme.published_date).toLocaleDateString();
        let ProgrammeItem = <div>
            <table className="table table-hover table-dark">
                {}
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Title</td>
                    <td>{ programme.title }</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Programme Leader</td>
                    <td>{ programme.programme_leader }</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Programme ID</td>
                    <td>{ programme.programme_id }</td>
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>Published Date</td>
                    <td>{date}</td>
                </tr>
                <tr>
                    <th scope="row">5</th>
                    <td>Description</td>
                    <td>{ programme.description }</td>
                </tr>
                </tbody>
            </table>
        </div>

        axios.get(backendPath + '/api/users/'+cookies.get("TOKEN"),  {
            headers: {
                withCredentials: true,
                authorization: 'Basic ' + cookies.get("CON")
            }
        }).then(function(response) {
        return (
            <div className="ShowModuleDetails">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 m-auto">
                            <br /> <br />
                            <Link to="/show-programmes" className="btn btn-outline-warning float-right" onClick={removeCookie("PROG")}>
                                Show Programmes
                            </Link>
                        </div>
                        <br />
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Programme Record</h1>
                            <p className="lead text-center">
                                View Programme Info
                            </p>
                            <hr /> <br />
                        </div>
                    </div>
                    <div>
                        { ProgrammeItem }
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,programme._id)}>Delete programme</button><br />
                        </div>

                        <div className="col-md-6">
                            <Link to={`/edit-programme/${programme._id}`} className="btn btn-outline-info btn-lg btn-block">
                                Edit Programme
                            </Link>
                            <br />
                        </div>

                    </div>
                    <div className="row">

                        <div className="col-md-12">
                            <button type="button" className="btn btn-outline-info btn-lg btn-block" onClick={this.onModuleClick.bind(this,programme.programme_id)}>View Modules</button>
                            <br />
                        </div>

                    </div>

                </div>
            </div>
        );
        })
        return (<h3>User Not Authenticated</h3>);
    }
}

export default showProgrammeDetails;