import React, { Component } from 'react'
import LoginForm from '../auth/LoginForm';
import {login} from '../services/auth'

export default class Home extends Component {
  state={
    user:{}
}
handleText=(e)=>{
  const {user} = this.state
  const field = e.target.name
  user[field] = e.target.value
  this.setState({user})
}
login=(e)=>{
  e.preventDefault()
  const {user} = this.state
  login(user)
      .then(r=>{
          localStorage.setItem('loggedUser',JSON.stringify(r))
          //console.log('logged',r)
          this.props.history.push('/profile')
          
      }).catch(e=>{
          console.log(e)
      })
}

  render() {
    
    return (

      <div className="component-container">
      <div className="landing-front">
      <section className="landing-title">
      <h1>Confiadoz</h1>
        <h3>¡Bienvenido a una nueva forma de hacer crédito!</h3>
        
        </section>
        <section className="login-form">
        <LoginForm
                login={this.login}
                handleText={this.handleText}/>
        </section>
        </div>
    <div className="landing-info">
    <div className="landing-info-cards">
    <section>
    <img src="" alt="entrepreneur-logo"/>
        <h2>Estudiantes empresarios</h2>
        <p>Queremos apoyar a los estudiantes en apuros y los nuevos empresarios que busquen mejorar la sociedad</p>
        </section>
        <section>
      <img src="" alt="micro-empresas-logo"/>
        <h2>Micro-empresas</h2>
        <p>Perfecto para personas trabajadoras que necesitan un ingreso extra para solucionar situaciones de inmediato</p>
        </section>
        <section>
      <img src="" alt="social-logo"/>
        <h2>Social</h2>
        <p>Invita a tus amigos y conocidos, entre más invitados tengas, ¡tu monto de prestamo subirá proporcionalmente!</p>
        </section>
    </div>
      <div className="landing-info-invest"> 
      <img src="" alt="investment-logo"/>
        <h3>¡Invierte con nosotros!</h3>
        <h2>¿Que te parece un ingreso extra?</h2>
        <p>Cualquier usuario puede convertirse en inversor con sólo 100 pesos, gana hasta el 3.5% de tu inversión, y recibe un descuento de 2% en tus préstamos</p>
        </div>
    </div>
      </div>
      
    )
  }
}
