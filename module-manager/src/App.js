import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import CreateModule from './components/CreateModule';
import ShowModuleList from './components/ShowModuleList';
import ShowModuleDetails from './components/ShowModuleDetails';
import UpdateModuleInfo from './components/UpdateModuleInfo';
import MapModule from './components/MapModule';
import SelectGoal from './components/SelectGoal';
import CreateObjective from './components/CreateObjective';
import ShowObjectives from './components/ShowObjectives';
import ShowProgrammes from './components/ShowProgrammes';
import CreateProgramme from './components/CreateProgramme';
import EditObjective from './components/EditObjective';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/show-module-list' component={ShowModuleList} />
          <Route path='/create-module' component={CreateModule} />
          <Route path='/edit-module/:id' component={UpdateModuleInfo} />
          <Route path='/show-module/:id' component={ShowModuleDetails} />
          <Route path='/map-module/:id' component={MapModule} />
          <Route path='/select-goal/:id' component={SelectGoal} />
          <Route path='/create-objective/:id' component={CreateObjective} />
          <Route path='/show-objectives/:id' component={ShowObjectives} />
          <Route path='/show-programmes' component={ShowProgrammes} />
          <Route path='/create-programme' component={CreateProgramme} />
          <Route path='/edit-objective' component={EditObjective} />
        </div>
      </Router>
    );
  }
}

export default App;
