import React, { Component } from 'react'
import {API_Verifier} from '../services/database'
import LoginForm from '../auth/LoginForm';

export default class verify extends Component {
    state = {
        user: null
      }
      componentDidMount () {
        const { code } = this.props.match.params
        API_Verifier(code)
        .then(r => {
        }).catch(r => r)
      }

  render() {
    return (

        <div className="component-container">
        <div className="landing-front">
        <h1>¡Gracias por verificar tu correo!</h1>
            <LoginForm/>
            
        </div>
      </div>
    )
  }
}
