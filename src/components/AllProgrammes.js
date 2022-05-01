import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import {backendPath} from "../path";
import { Link } from 'react-router-dom';
import Programme2Card from './Programme2Card';
import Cookies from "universal-cookie";
import {removeCookie} from "../removeCookie";
const cookies = new Cookies();

class AllProgrammes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            programmes: []
        };
    }

    async componentDidMount() {
        axios
            .get(backendPath + '/api/programmes')
            .then(async res => {
                this.setState({
                    programmes: res.data
                })
            })
            .catch(err => {
                console.log('Error from ShowProgrammes');
            })
    };


    render() {
        const programmes = this.state.programmes;

        let programmeList;
        if (!programmes) {
            programmeList = "there is no module record!";
        } else {
            programmeList = programmes.map((programme, k) =>
                <Programme2Card programme={programme} key={k}/>
            );
        }

        if (cookies.get("TOKEN")) {
            return (
                <div className="ShowModuleList">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <br/>
                                <h2 className="display-4 text-center">Programmes List</h2>
                            </div>

                            <div className="col-md-11">
                                <Link to="/show-module-list" className="btn btn-outline-warning float-left">
                                    Return to Modules
                                </Link>
                                <br/>
                                <br/>
                                <hr/>
                            </div>

                            <div id="app"></div>

                        </div>

                        <div className="list">
                            {programmeList}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<h3>User Not Authenticated</h3>);
        }
    }
}


export default AllProgrammes;