import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import {backendPath} from "../path";
import ObjectiveCard from "./ObjectiveCard";
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
        axios
            .get(backendPath + '/api/objectives/' + cookies.get("MODULE")+':' + cookies.get("GOAL"))
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
        console.log("Printobjective: " + objectives);
        let objectiveList;

        if(!objectives) {
            objectiveList = "there is no objective record!";
        } else {
            objectiveList = objectives.map((objective, k) =>
                <ObjectiveCard objective={objective} key={k} />
            );
        }

        return (
            <div className="ShowModuleList">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <br />
                            <h2 className="display-4 text-center">Programme objectives List</h2>
                        </div>

                        <div className="col-md-11">
                            <Link to={`/map-module/${modId}`} className="btn btn-outline-warning float-right">
                                Module Mapping
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