import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Goal2Card = (props) => {
    const  goal  = props.goal;

    function onGoalClick () {
        try {
            cookies.remove("GOAL", { path: '/' });
        } catch (err) {

        }
        cookies.set("GOAL", goal._id, {path: "/"})
    }

    return(
        <div className="goalcard-container">
            <div className="desc">
                <h2>
                    <Link to={`/create-objective/${goal._id}`} onClick={onGoalClick.bind(goal._id)}>
                        { goal.goal_name }
                    </Link>
                </h2>
                <h3>{goal.goal_id}</h3>
                <p>{goal.programme_id}</p>
            </div>
        </div>
    )
};

export default Goal2Card;