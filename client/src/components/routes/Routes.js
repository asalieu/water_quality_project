import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from '../login/SignIn';
import SignUp from '../signup/SignUp';
import Main from '../userContext/Main';
import Dashboard from '../dashboard/Dashboard';
import Manage from '../userContext/Manage'
import Manage_Data from '../userContext/Manage_Data'


class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={SignIn} />
          <Route path='/Manage_Data'  component ={Manage_Data} />
          <Route path='/Manage' component={Manage} />
          <Route path='/SignUp' component={SignUp} />
          <Route path='/Main' component={Main} />                   
          <Route path='/Dashboard' component={Dashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;