import React from 'react'
import {Route, Switch} from 'react-router-dom';
import Home from './components/landing/Home';
import AuthPage from './components/auth/AuthPage';
import Profile from './components/users/Profile'
import Conekta from './components/services/conekta/conekta';
import staffLogin from './components/admin/staff';
import createStaffLogics from './components/admin/createStaffLogics';


const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Home }/>
    <Route exact path="/deposit" component={Conekta}/>
    <Route exact path="/auth/signup" component={AuthPage}/>
    <Route exact path="/auth/login" component={AuthPage}/>
    <Route exact path="/staff/new" component={createStaffLogics}/>
    <Route exact path="/staff/create" component={createStaffLogics}/>
    <Route exact path="/staff" component={staffLogin}/>
    <Route exact path="/profile/edit" component={Profile}/>
    <Route exact path="/profile" component={Profile}/>
  </Switch>
)

export default Routes;