import React, { Component } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

class AuthPage extends Component {

    state={
        user:{}
    }

  render() {
      const {pathname} = this.props.location
    return (
        <div className="component-container">
        <div className="landing-front">
            {pathname==='/auth/login'?
            <LoginForm/>
            :
            <SignupForm/> 
            }
        </div>
      </div>
    )
  }
}

export default AuthPage
