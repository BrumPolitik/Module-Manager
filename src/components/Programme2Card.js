import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import {removeCookie} from "../removeCookie";
import Cookies from "universal-cookie";
const cookies = new Cookies();




const Programme2Card = (props) => {
    const  programme  = props.programme;

    return(
        <div className="card-container">
            <div className="desc">
                <h2>
                    {programme.title}
                </h2>
                <h3>{programme.programme_leader}</h3>
                <p>{programme.description}</p>
            </div>
        </div>
    )
};

export default Programme2Card;