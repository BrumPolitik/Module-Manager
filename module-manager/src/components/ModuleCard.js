import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const ModuleCard = (props) => {
    const  module  = props.module;

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
            </div>
        </div>
    )
};

export default ModuleCard;