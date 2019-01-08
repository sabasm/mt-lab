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
    <img src="https://image.flaticon.com/icons/svg/201/201818.svg" height="120" width="120" alt="entrepreneur-logo"/>
        <b>
        <h2>Estudiantes emprendedores</h2>
        <p>Queremos apoyar a los estudiantes en apuros y los nuevos empresarios que busquen mejorar la sociedad</p>
        </b>
        </section>
        <section>
      <img src="https://image.flaticon.com/icons/svg/1055/1055646.svg" height="120" width="120" alt="micro-empresas-logo"/>
        <b>
        <h2>Micro-empresas</h2>
        <p>Perfecto para personas trabajadoras que necesitan un ingreso extra para solucionar situaciones de inmediato</p>
        </b>
        </section>
        <section>
          <b>
      <img src="https://image.flaticon.com/icons/svg/1049/1049867.svg" height="120" width="120" alt="social-logo"/>
        <h2>Social</h2>
        <p>Invita a tus amigos y conocidos, entre más invitados tengas, ¡tu monto de prestamo subirá proporcionalmente!</p>
        </b>
        </section>
    </div>
      <div className="landing-info-invest"> 
      <img src="https://image.flaticon.com/icons/svg/877/877627.svg" height="120" width="120" alt="investment-logo"/>
        <b>
        <h3>¡Invierte con nosotros!</h3>
        <h2>¿Que te parece un ingreso extra?</h2>
        <p>Cualquier usuario puede convertirse en inversor con sólo 100 pesos, gana hasta el 3.5% de tu inversión, y recibe un descuento de 2% en tus préstamos</p>
        </b>
        </div>
    </div>
      </div>
      
    )
  }
}
