import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import {removeCookie} from "../removeCookie";
import Cookies from "universal-cookie";
const cookies = new Cookies();



const ProgrammeCard = (props) => {
    const  programme  = props.programme;

    function onProgClick () {
        removeCookie("PROG")
        cookies.set("PROG", programme._id, {path: "/"})
    }

    return(
        <div className="card-container">
            <div className="desc">
                <h2>
                    <Link to={`/show-module-list`} onClick={onProgClick.bind()}>
                        { programme.title }
                    </Link>
                </h2>
                <h3>{programme.programme_leader}</h3>
                <p>{programme.description}</p>
            </div>
        </div>
    )
};

export default ProgrammeCard;