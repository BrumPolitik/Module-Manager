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
            return (
                <input type="checkbox" id={"confirmCheck"} />
            )
        }
    }
    window.onload = function () {
        let confirmbox = document.getElementById("confirmCheck")
        confirmbox.addEventListener('change', (event) => {
            if (event.currentTarget.checked) {
                const data = {
                    confirmed: true
                }
                axios.put(backendPath + '/api/modules/' + module._id, data)
            } else {
                const data = {
                    confirmed: false
                }
                axios.put(backendPath + '/api/modules/' + module._id, data)
            }
        })
    }

    return(
        <div className="card-container">
            <div className="desc">
                <h2>
                    <Link to={`/show-module/${module._id}`}>
                        { module.title }
                    </Link>
                </h2>
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