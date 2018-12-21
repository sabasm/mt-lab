import React from 'react'
import {Route, Switch} from 'react-router-dom';
import Home from './components/landing/Home';
import AuthPage from './components/auth/AuthPage';
import Profile from './components/users/Profile'
import dashboard from './components/admin/dashboard/dashboard';
import StaffLogin from './components/admin/auth/StaffLogin';
import StaffSignup from './components/admin/auth/StaffSignup'
import Conekta from './components/services/conekta/conekta';


const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Home }/>
    <Route exact path="/deposit" component={Conekta}/>
    <Route exact path="/auth/e/signup" component={StaffSignup}/>
    <Route exact path="/auth/e/login" component={StaffLogin}/>
    <Route exact path="/auth/e/dashboard" component={dashboard}/>
    <Route exact path="/auth/signup" component={AuthPage}/>
    <Route exact path="/auth/login" component={AuthPage}/>
    <Route exact path="/profile/edit" component={Profile}/>
    <Route exact path="/profile" component={Profile}/>
  </Switch>
)

export default Routes;