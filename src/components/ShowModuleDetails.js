import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import {backendPath} from "../path";
import Cookies from "universal-cookie";
import {removeCookie} from "../removeCookie";
const cookies = new Cookies();

class showModuleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      module: {}
    };
  }

  componentDidMount() {
    axios
      .get(backendPath + '/api/modules/'+ this.props.match.params.id)
      .then(res => {
        this.setState({
          module: res.data[0]
        })

      })
      .catch(err => {
        console.log("Error from ShowModuleDetails");
      })
  };

  onDeleteClick (id) {
    axios
      .delete(backendPath + '/api/modules/'+id)
      .then(res => {
        axios
            .get(backendPath + "/api/objectives/" + id)
            .then(res => {
              for (const objective of res.data) {
                axios.delete(backendPath + "/api/objectives/" + objective._id)
              }
            }).catch(err => {})
        this.props.history.push("/show-module-list");
      })
      .catch(err => {
        console.log("Error form ShowModuleDetails_deleteClick");
      })
  };

  onMapClick (id) {
    removeCookie("MODULE")
    cookies.set("MODULE", id, {path: "/"})
    const module = this.state.module;
    window.location.href=`/map-module/${module._id}`;
  }


  render() {

    const module = this.state.module;
    let date = new Date(module.published_date).toLocaleDateString();
    //console.log(module.title);
    let ModuleItem = <div>
      <table className="table table-hover table-dark">
        {}
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Title</td>
            <td>{ module.title }</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Module Leader</td>
            <td>{ module.module_leader }</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Programme ID</td>
            <td>{ module.programme_id }</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Module ID</td>
            <td>{ module.module_id }</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Published Date</td>
            <td>{date}</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Description</td>
            <td>{ module.description }</td>
          </tr>
        </tbody>
      </table>
    </div>

    axios.get(backendPath + '/api/users/'+cookies.get("TOKEN"),  {
      headers: {
        withCredentials: true,
        authorization: 'Basic ' + cookies.get("CON")
      }
    }).then(function(response) {
    return (
      <div className="ShowModuleDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/show-module-list" className="btn btn-outline-warning float-right" onClick={removeCookie("MODULE")}>
                  Show Module List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Module Record</h1>
              <p className="lead text-center">
                  View Module Info
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { ModuleItem }
          </div>

          <div className="row">
            <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,module._id)}>Delete Module</button><br />
            </div>

            <div className="col-md-6">
              <Link to={`/edit-module/${module._id}`} className="btn btn-outline-info btn-lg btn-block">
                    Edit Module
              </Link>
              <br />
            </div>

          </div>
          <div className="row">

            <div className="col-md-12">
              <button type="button" className="btn btn-outline-info btn-lg btn-block" onClick={this.onMapClick.bind(this,module._id)}>View Module Objectives</button><br />
            </div>

          </div>

        </div>
      </div>
    );
    })
    return (<h3>User Not Authenticated</h3>);
  }
}

export default showModuleDetails;