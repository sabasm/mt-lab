import React, { Component } from 'react'
import {login} from '../services/auth'
import { Redirect,Link } from 'react-router-dom'
import {API_lookFor} from '../services/database'
import { Button , Input, Icon, Card} from 'antd'

const { Meta } = Card;

class LoginForm extends Component {

    state={
        user:{} ,
        redirect: false,
        client: true,
        error:false,
        errorsPicker:{
          //Este usuario no existe
          user1:false,
          //Comprueba tu usuario y contraseña
          user2:false},
          loading: false,
          iconLoading: false,
      }
      enterLoading = () => {
        this.setState({ loading: true });
      }    
      enterIconLoading = () => {
        this.setState({ iconLoading: true });
      }

      renderRedirect = () => {
        if (this.state.redirect) {
        if (this.state.client) {
          return <Redirect to='/profile' />
        }else{
          return <Redirect to='/profile' />}
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

    lookFor = (lookingFor) => {
      return new Promise((resolve, reject) => {
      let exist=false;
          API_lookFor(lookingFor)
              .then(r => {
                  exist=r.exist
                  if (this.state.user === "") exist=false
                  resolve(exist)
              }).catch(r => {
                  reject("Favor de llenar todos los datos")
              })
      })
  }

  checker = (e) => {
    e.preventDefault()
    let check=0;
    const {user} = this.state
    console.log(user)
//CHECKS EN BASE DE DATOS
    //...CHECK 1
    //buscar usuario repetido
    let busqueda1 = new Promise ((resolve,reject)=>{
        this.lookFor({username: user.username})
        .then(r=>{
        if (!r){
        resolve(this.state.errorsPicker.user1=true)
        } else{
        check++
        resolve(this.state.errorsPicker.user1=false)
        }
        })
        .catch(e=>console.log(e))
    })

//CHECKS IN SITU
        //...CHECK 3
    //checando longitud de usuario
    if (user.username === undefined || user.username.length <6 || user.username.length>12 ||  user.password===undefined || !user.password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/)){
        this.state.errorsPicker.user2=true
    }else{
        this.state.errorsPicker.user2=false
        check++
    }
  console.log(user)

    Promise.all([busqueda1])
    .then(()=>{
        if(check === 2){ 
            this.login() 
            this.enterLoading()}else{this.setState ({error:true})}
    })
    .catch(r=>console.log("no entra al then pero si al catch del promise all"))
}
    

    handleText=(e)=>{
        const {user} = this.state
        const field = e.target.name
        user[field] = e.target.value
        this.setState({user})
    }

  render() {
    
    return (
     <div>{this.renderRedirect()}
<Card style={{ width: 250, marginTop: 16 }} >
  <Meta
    title="Iniciar sesión"
    // description="LogIn card for PitayaLabs Microcréditos"
/>
  <label>
      <form method="POST" onSubmit={this.checker}>
        <label>
            <hr/>
            <Input size="small" placeholder="Usuario" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" name="username" onChange={this.handleText} required/>
            {/* <input type="text" name="username" onChange={this.handleText} required/> */}
            { this.state.errorsPicker.user1 ? <small className="form-errors"><br/>Este usuario no existe</small>: null }
            { this.state.errorsPicker.user2 ?  <small className="form-errors"><br/>Comprueba tu usuario y contraseña</small> :
            <small className="form-info"><br/>Ingresa tu usuario y contraseña para iniciar sesión</small>}
        </label><br/><br/>
        <label>
            <Input size="small" placeholder="Contraseña" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" name="password" onChange={this.handleText} required/>
            {/* <input type="password" name="password" onChange={this.handleText} required/> */}
        </label><br/><br/>
       <Button key="submit" htmlType="submit" type="submit" loading={this.state.loading} >Iniciar sesión</Button>
        <hr/>
        <small className="form-info"><br/>¿Olvidaste tus datos de acceso?, da click <Link to="/resetaccess">aquí</Link>.</small>
      </form>
      </label>
</Card>
    </div>
    )
  }
}

export default LoginForm
