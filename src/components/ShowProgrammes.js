import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import {backendPath} from "../path";
import { Link } from 'react-router-dom';
import ProgrammeCard from './ProgrammeCard';
import Cookies from "universal-cookie";
import {removeCookie} from "../removeCookie";
const cookies = new Cookies();

class ShowProgrammes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            programmes: []
        };
    }

    async componentDidMount() {
        let userid = await axios.get(backendPath + '/api/users/' + cookies.get("TOKEN"));
        axios
            .get(backendPath + '/api/programmes/' + userid.data[0].user_id)
            .then(async res => {
                this.setState({
                    programmes: res.data
                })
                let response = await axios.get(backendPath + '/api/goals')
                this.setState({
                    goalsArray: response.data
                })
            })
            .catch(err =>{
                console.log('Error from ShowProgrammes');
            })
    };


    render() {
        const programmes = this.state.programmes;
        const goals = this.state.goalsArray;

        let programmeList;
        if(!programmes) {
            programmeList = "there is no module record!";
        } else {
            programmeList = programmes.map((programme, k) =>
                <ProgrammeCard programme={programme} goals={goals} key={k} />
            );
        }

        return (
            <div className="ShowModuleList">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <br />
                            <h2 className="display-4 text-center">Programmes List</h2>
                        </div>

                        <div className="col-md-11">
                            <Link to="/create-programme" className="btn btn-outline-warning float-left">
                                + Add New Programme
                            </Link>
                            <br />
                            <br />
                            <hr />
                        </div>

                        <div id="app"></div>

                    </div>

                    <div className="list">
                        {programmeList}
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowProgrammes;