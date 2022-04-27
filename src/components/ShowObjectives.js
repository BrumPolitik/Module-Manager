import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import {backendPath} from "../path";
import Objective2Card from "./Objective2Card";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class ShowObjectives extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objective: {}
        };
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        axios
            .get(backendPath + '/api/objectives/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    objectives: res.data
                })
            })
            .catch(err =>{
                console.log('Error from ShowObjectives');
            })
    };


    render() {
        const modId = cookies.get("MODULE")
        const objectives = this.state.objectives;
        let objectiveList;

        if(!objectives) {
            objectiveList = "there is no objective record!";
        } else {
            objectiveList = objectives.map((objective, k) =>
                <Objective2Card objective={objective} key={k} />
            );
            console.log("here");
        }

        return (
            <div className="ShowModuleList">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <br />
                            <h2 className="display-4 text-center">Objectives List</h2>
                        </div>

                        <div className="col-md-11">
                            <Link to={`/show-programmes`} className="btn btn-outline-warning float-right">
                                Programmes
                            </Link>
                            <br />
                            <br />
                            <hr />
                        </div>

                        <div id="app"></div>

                    </div>

                    <div className="list">
                        {objectiveList}
                    </div>
                </div>
            </div>
        );
    }
}
export default ShowObjectives;