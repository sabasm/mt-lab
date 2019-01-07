import React, { Component } from 'react'
import {API_lookFor} from '../services/database'
import {API_ResetPass} from '../services/auth'
import { Redirect } from 'react-router-dom'

export default class resetAccess extends Component {
  state = {
    user: {},
    validCode:false,
    redirect: false,
    error:false,
    password:false
}
      componentDidMount () {
        const confirmationCode  = this.props.match.params.code
        API_lookFor({confirmationCode})
        .then(r => {
          console.log(r)
          const { history } = this.props;
          if (r.exist) {
          this.setState({validCode:true,user:r.response})}
          else{

          history.push("/resetaccess")
          }

        }).catch(r => {
            console.log(r)
        })
      }

      resetPass=(password)=>{
        const {user} = this.state
        API_ResetPass({user:user.username , password: user.password})
        .then(
          this.setState({redirect:true}))
        .catch(e=>console.log(e))
      }

      renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to = '/auth/login' />
        }
    }

      checker = (e) => {
        e.preventDefault()
        let check=0;
        const {user} = this.state
        console.log("checker ",user)
        
        //...CHECK 1
        //comprobando contraseña
        if (user.password!==undefined && user.password===user.password2 && user.password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/) ){
          this.setState ({password:false})
          console.log("entra al true del password check")
        check++
        }else{
          this.setState ({password:true})
        }
        if(check === 1){ this.resetPass(user.password)}else{this.setState ({error:true})}
       }
       handleText = (e) => {
        const {user} = this.state
        const field = e.target.name
        user[field] = e.target.value
        this.setState({
            user
        })
    }

  render() {
    return (

        <div className="component-container">
        <div className="landing-front">
       {this.renderRedirect()}
        <div className = "all-forms "> 
        <label> Elige una nueva contraseña:
            <hr/>
            <form method = "POST"
            onSubmit = {this.checker} >
            <div>
            <label>
            Nueva contraseña: < br />
            <input type = "password" name = "password" onChange = {this.handleText} required/> 
            {this.state.password ? <small className="form-errors"><br/>Tu contraseña debe ser mayor de 5 caracteres y contener por lo menos un número, una mayúscula y una minúscula</small>: 
            <small className="form-info"><br/>Tu contraseña debe ser mayor de 5 caracteres y contener por lo menos un número, una mayúscula y una minúscula</small> }
            </label><br/ > < br />
            <label>
            Repite tu contraseña: < br />
            <input type = "password" name = "password2" onChange = {this.handleText} required/> 
            {this.state.password ? <small className="form-errors"><br/>Comprueba que las contraseñas coinciden</small>:null}
            </label><br/ > < br />
            <button type = "submit" >Continuar</button> 
            </div>
            </form> </label> </div>
            
        </div>
      </div>
    )
  }
}
