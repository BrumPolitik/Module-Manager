import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProgrammeCard from './ProgrammeCard';

class ShowProgrammes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            programmes: []
        };
    }

    componentDidMount() {
        axios
            .get('http://localhost:8082/api/programmes')
            .then(res => {
                this.setState({
                    programmes: res.data
                })
            })
            .catch(err =>{
                console.log('Error from ShowProgrammes');
            })
    };


    render() {
        const programmes = this.state.programmes;
        console.log("PrintModule: " + programmes);
        let programmeList;

        if(!programmes) {
            programmeList = "there is no module record!";
        } else {
            programmeList = programmes.map((programme, k) =>
                <ProgrammeCard programme={programme} key={k} />
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