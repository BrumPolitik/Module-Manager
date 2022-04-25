import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import {backendPath} from "../path";
import { Link } from 'react-router-dom';
import ModuleCard from './ModuleCard';
import Cookies from "universal-cookie";
const cookies = new Cookies();


class ShowModuleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modules: [],
      prog: false
    };
  }


  async componentDidMount() {
    let userid = await axios.get(backendPath + '/api/users/' + cookies.get("TOKEN"));
    if (userid.data[0].user_type === "prog") {
      let progid = await axios.get(backendPath + '/api/programmes/' + cookies.get("PROG"));
      axios
          .get(backendPath + '/api/modules/' + progid.data[0].programme_id)
          .then(res => {
            this.setState({
              modules: res.data
            })
          })
          .catch(err => {
            console.log('Error from ShowModuleList');
          })
      this.state.prog = true;
    } else {
      axios
          .get(backendPath + '/api/modules/' + userid.data[0].user_id)
          .then(res => {
            this.setState({
              modules: res.data
            })
          })
          .catch(err => {
            console.log('Error from ShowModuleList');
          })
    }
  };

  renderProg() {
    if (this.state.prog === true) {
      return (
          <Link to="/show-programmes" className="btn btn-outline-warning float-right">
            View Programmes
          </Link>
      )
    }
  }


  render() {
    const modules = this.state.modules;
    console.log("PrintModule: " + modules);
    let moduleList;

    if(!modules) {
      moduleList = "there is no module record!";
    } else {
      moduleList = modules.map((module, k) =>
        <ModuleCard module={module} prog={this.state.prog} key={k} />
      );
    }

    return (
      <div className="ShowModuleList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Modules List</h2>
            </div>

            <div className="col-md-11">
              <Link to="/create-module" className="btn btn-outline-warning float-left">
                + Add New Module
              </Link>
              {this.renderProg()}
              <br />
              <br />
              <hr />
            </div>


          </div>

          <div className="list">
                {moduleList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowModuleList;