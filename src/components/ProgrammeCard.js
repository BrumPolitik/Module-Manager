import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import {removeCookie} from "../removeCookie";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import Goal2Card from "./Goal2Card";



const ProgrammeCard = (props) => {
    const  programme  = props.programme;
    let goals = props.goals;

    let displayGoals = [];
    try {
        for (const element of goals) {
            if (element.programme_id === programme.programme_id) {
                displayGoals.push(element);
            }
        }
    } catch (err) {
    }

    let goalList;
    if(!displayGoals) {
        goalList = "there is no goal record!";
    } else {
        goalList = displayGoals.map((goal, k) =>
            <Goal2Card goal={goal} key={k}/>
        );
    }

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
                {goalList}
            </div>
        </div>
    )
};

export default ProgrammeCard;