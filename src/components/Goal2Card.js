import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Cookies from "universal-cookie";
const cookies = new Cookies();
import {backendPath} from "../path";

const Goal2Card = (props) => {
    const  goal  = props.goal;

    function onDeleteClick (id) {
        axios
            .delete(backendPath + '/api/goals/' + goal._id)
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                console.log("Error form ShowModuleDetails_deleteClick");
            })
    };

    function onEditClick (id) {
        window.location.href=`/edit-goal/${goal._id}`;
    }

    return(
        <div className="float-left">
            <div className="obj-container">
                <h2>{goal.goal_name}</h2>
                <div>
                    <div className="padded">
                        <button className="btn margin-right" onClick={onEditClick.bind(goal._id)}><i className="fa fa-pencil-alt"></i></button>

                        <button className="btn red" onClick={onDeleteClick.bind(goal._id)}><i className="fa fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Goal2Card;