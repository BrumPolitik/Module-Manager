import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import GoalCard from "./GoalCard";
import {backendPath} from "../path";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class MapModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goal: {}
        };
    }

    async componentDidMount() {
        let progId = await axios.get(backendPath + '/api/modules/' + cookies.get("MODULE"));

        axios
            .get(backendPath + '/api/goals/' + progId.data[0].programme_id)
            .then(async res => {
                this.setState({
                    goals: res.data
                })
                let response = await axios.get(backendPath + '/api/objectives/' + cookies.get("MODULE"))
                this.setState({
                    objectivesArray: response.data
                })
            })
            .catch(err => {
                console.log('Error from MapModule');
            });
    };


    render() {
        const modId = cookies.get("MODULE")
        const goals = this.state.goals;
        const objectives = this.state.objectivesArray;
        console.log("PrintGoal: " + goals);
        let goalList;

        if(!goals) {
            goalList = "there is no goal record!";
        } else {
            goalList = goals.map((goal, k) =>
                <GoalCard goal={goal} objectives={objectives} key={k}/>
            );
        }

        axios.get(backendPath + '/api/users/'+cookies.get("TOKEN"),  {
            headers: {
                withCredentials: true,
                authorization: 'Basic ' + cookies.get("CON")
            }
        }).then(function(response) {
        return (
            <div className="ShowModuleList">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <br />
                            <h2 className="display-4 text-center">Programme Goals List</h2>
                        </div>

                        <div className="col-md-11">
                            <Link to={`/show-module/${modId}`} className="btn btn-outline-warning float-right">
                                Show Module Details
                            </Link>
                            <br />
                            <br />
                            <hr />
                        </div>

                        <div id="app"></div>

                    </div>

                    <div className="list">
                        {goalList}
                    </div>
                </div>
            </div>
        );
        })
        return (<h3>User Not Authenticated</h3>);
    }
}
export default MapModule;