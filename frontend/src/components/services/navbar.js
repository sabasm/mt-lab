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
        {/* <NavLink className="nav-links nav-inactive" to="/auth/login" activeClassName="nav-selected"><span>Inicia sesión</span></NavLink> */}
        <NavLink className="nav-links nav-inactive" to="/auth/signup" activeClassName="nav-selected"><span>Regístrate</span></NavLink>
        <NavLink className="nav-links nav-inactive" to="/" onClick={logout} >Cerrar sesión</NavLink>
        <NavLink className="nav-links nav-inactive" to="/profile" activeClassName="nav-selected">Perfil</NavLink>
        </section>
      </nav>
    )
  }
}