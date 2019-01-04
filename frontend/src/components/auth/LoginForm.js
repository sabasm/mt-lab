import React, { Component } from 'react'
import {login} from '../services/auth'
import { Redirect } from 'react-router-dom'

class LoginForm extends Component {

    state={
        user:{} ,
        redirect: false,
        client: true
      }
      renderRedirect = () => {
        if (this.state.redirect) {
        if (this.state.client) {
          return <Redirect to='/profile' />
        }else{
          return <Redirect to='/staff' />}
        }
      }

      login=(e)=>{
        const {user} = this.state
        login(user)
            .then(r=>{
                localStorage.setItem('loggedUser',JSON.stringify(r))
                this.setState({
                  redirect: true,
                  client : r.client
                })
                
                
            }).catch(e=>{
                console.log(e)
            })
    }

    checker=(e)=>{
        e.preventDefault()
       //check
       this.login()

    }
    

    handleText=(e)=>{
        const {user} = this.state
        const field = e.target.name
        user[field] = e.target.value
        this.setState({user})
    }

  render() {
    
    return (
     <div className="all-forms">{this.renderRedirect()}
      <label>Iniciar sesión:
          <hr/>
      <form method="POST" onSubmit={this.checker}>
        <label>
            Usuario:<br/>
            <input type="text" name="username" onChange={this.handleText}/>
        </label><br/><br/>
        <label>
            Password:<br/>
            <input type="password" name="password" onChange={this.handleText}/>
        </label><br/><br/>
        <button type="submit">Log in</button>
      </form>
      </label>
    </div>
    )
  }
}

export default LoginForm
