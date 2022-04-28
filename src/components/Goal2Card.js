import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Cookies from "universal-cookie";
import {backendPath} from "../path";
import axios from "axios";
const cookies = new Cookies();


const Goal2Card = (props) => {
    const  goal  = props.goal;

    function onDeleteClick (id) {
        axios
            .delete(backendPath + '/api/goals/' + goal._id)
            .then(res => {
                axios
                    .get(backendPath + "/api/objectives/" + goal._id)
                    .then(res => {
                        for (const objective of res.data) {
                            axios.delete(backendPath + "/api/objectives/" + objective._id)
                        }
                    }).catch(err => {})
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
                <h2>
                    <Link to={`/show-objectives/${goal._id}`}>{goal.goal_name}</Link>
                </h2>
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