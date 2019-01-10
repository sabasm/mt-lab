import React from 'react'
import {Route, Switch} from 'react-router-dom';
import Home from './components/landing/Home';
import AuthPage from './components/auth/AuthPage';
import Profile from './components/users/Profile'
import Conekta from './components/services/conekta/conekta';
import staffLogin from './components/admin/staff';
import createStaffLogics from './components/admin/createStaffLogics';
import verify from './components/users/verify';
import ResetAccess from './components/auth/ResetAccess';
import resetAccess from './components/users/resetAccess';


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
    <Route exact path="/resetaccess" component={ResetAccess}/>
    <Route path="/resetaccess/aSDAha4jfasddda" component={resetAccess}/>
    <Route path="/verify/aSDAha4jfasddda" component={verify}/>
  </Switch>
)

export default Routes;