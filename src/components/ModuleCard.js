import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import {backendPath} from "../path";
import axios from "axios";

const ModuleCard = (props) => {
    const  module  = props.module;
    let confirm;
    if (module.confirmed) {
        confirm = "Module Confirmed"
    } else {
        confirm = "Module Unconfirmed"
    }

    function renderProg() {
        if (props.prog === true) {
            if (!module.confirmed) {
                return (
                    <button className="btn margin-top" onClick={confirmation.bind()}>Accept</button>
                )
            }
        }
    }
    function confirmation() {
        const data = {
            confirmed: true
        }
        axios
            .put(backendPath + '/api/modules/' + module._id, data)
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                console.log("Error form ModuleCard_confirmation");
            })
    };

    return(
        <div className="card-container">
            <div className="desc">
                <h2>
                    <Link to={`/show-module/${module._id}`}>
                        { module.title }
                    </Link>
                </h2>
                <h3>{module.module_leader}</h3>
                <h3>{module.module_leader}</h3>
                <p>{module.description}</p>
                <div>
                    <p>{confirm}</p>
                    {renderProg()}
                </div>
            </div>
        </div>
    )
};

export default ModuleCard;