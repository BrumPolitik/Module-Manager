import React from 'react';
import '../App.css';
import axios from "axios";
import {backendPath} from "../path";
import Cookies from "universal-cookie";
const cookies = new Cookies();


const Objective2Card = (props) => {
    const  objective  = props.objective;

    return(
        <div className="float-left">
            <div className="obj-container">
                <h2>{objective.obj_name }</h2>
            </div>
        </div>
    )
};

export default Objective2Card;