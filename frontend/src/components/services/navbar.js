import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import { logout } from './auth';

export default class navbar extends Component {
  state={
    user:{}
}
logout=(e)=>{
  e.preventDefault()
  const {user} = this.state
  logout(user)
      .then(r=>{
          localStorage.removeItem('loggedUser')
          this.props.history.push('/')
          
      }).catch(e=>{
          console.log(e)
      })
    }

  render() {
    return (
      <nav className="nav-bar">
      <section className="nav-bar-logo">
        <NavLink to="/" className="nav-inactive"><img src="" alt="confiadoz-logo"/></NavLink>
        </section>
      <section className="nav-bar-links-container">
        <NavLink className="nav-links nav-inactive" to="/auth/login" activeClassName="nav-selected"><span>Login</span></NavLink>
        <NavLink className="nav-links nav-inactive" to="/auth/signup" activeClassName="nav-selected"><span>Signup</span></NavLink>
        <NavLink className="nav-links nav-inactive" to="/" onClick={logout} >Logout</NavLink>
        <NavLink className="nav-links nav-inactive" to="/profile" activeClassName="nav-selected">Profile</NavLink>
        <NavLink className="nav-links nav-inactive" to="/auth/elogin" activeClassName="nav-selected">staff login</NavLink>
        </section>
      </nav>
    )
  }
}