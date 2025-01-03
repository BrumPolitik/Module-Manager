import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import {backendPath} from "../path";
import Goal2Card from "./Goal2Card";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class SelectGoal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goal: {}
        };
    }

    async componentDidMount() {
        let progId = await axios.get(backendPath + '/api/modules/' + cookies.get("MODULE"));

        axios
            .get(backendPath + '/api/goals' +  + progId.data[0].programme_id)
            .then(res => {
                this.setState({
                    goals: res.data
                })
            })
            .catch(err => {
                console.log('Error from SelectGoal');
            })
    };


    render() {
        const modId = cookies.get("MODULE")
        const goals = this.state.goals;
        console.log("PrintGoal: " + goals);
        let goalList;

        if(!goals) {
            goalList = "there is no goal record!";
        } else {
            goalList = goals.map((goal, k) =>
                <Goal2Card goal={goal} key={k} />
            );
        }

        if (cookies.get("TOKEN")) {
        return (
            <div className="SelectGoal">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <br />
                            <h2 className="display-4 text-center">Select Programme Goal</h2>
                        </div>

                        <div className="col-md-11">
                            <Link to={`/map-module/${modId}`} className="btn btn-outline-warning float-right">
                                Return to Map Module View
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
        } else {
            return (<h3>User Not Authenticated</h3>);
        }
    }
}
export default SelectGoal;