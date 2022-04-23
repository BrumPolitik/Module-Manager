import React from 'react';
import '../App.css';
import axios from "axios";
import {backendPath} from "../path";
import Cookies from "universal-cookie";
const cookies = new Cookies();


const ObjectiveCard = (props) => {
    const  objective  = props.objective;

    function onDeleteClick (id) {
        axios
            .delete(backendPath + '/api/objectives/'+objective._id)
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                console.log("Error form ShowModuleDetails_deleteClick");
            })
    };

    function onEditClick (id) {
        window.location.href=`/edit-objective/${objective._id}`;
    }

    return(
        <div className="card-container">
            <div className="desc">
                <h2>{objective.obj_name }</h2>
                <h3>{objective.obj_id}</h3>
            </div>
            <div>
                <div >
                    <button className="btn" onClick={onEditClick.bind(objective._id)}><i className="fa fa-pencil-alt"></i></button>
                    <button className="btn red" onClick={onDeleteClick.bind(objective._id)}><i className="fa fa-trash"></i></button>
                </div>
            </div>
        </div>
    )
};

export default ObjectiveCard;