import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Cookies from "universal-cookie";
import ObjectiveCard from "./ObjectiveCard";
const cookies = new Cookies();

const GoalCard = (props) => {
    const goal = props.goal;
    let objectives = props.objectives;
    let displayObjectives = [];
    try {
        for (const element of objectives) {
            if (element.goal_id === goal._id) {
                displayObjectives.push(element);
            }
        }

    } catch (err) {

    }

    let objList;
    if(!displayObjectives) {
        objList = "there is no goal record!";
    } else {
        objList = displayObjectives.map((objective, k) =>
            <ObjectiveCard objective={objective} key={k}/>
        );
    }


    function onGoalClick() {
        try {
            cookies.remove("GOAL", {path: '/'});
        } catch (err) {

        }
        cookies.set("GOAL", goal._id, {path: "/"})
    }

    function onCreateClick () {
        try {
            cookies.remove("GOAL", { path: '/' });
        } catch (err) {

        }
        cookies.set("GOAL", goal._id, {path: "/"})
        window.location.href=`/create-objective/${goal._id}`
    }


    return (
        <div className="card-container">
            <div className="desc">
                {goal.goal_name}
                <p>{goal.programme_id}</p>
                <div>
                    {objList}
                </div>
                <button className="btn margin-top" onClick={onCreateClick.bind(goal._id)}><i className="fa fa-plus"></i></button>
            </div>
        </div>
    )
};

export default GoalCard;