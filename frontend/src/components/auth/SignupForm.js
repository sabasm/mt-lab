import React, {Component} from 'react'
import {signup} from '../services/auth'
import {Redirect} from 'react-router-dom'
import {API_lookFor} from '../services/database'
import { Link } from 'react-router-dom'
import { Button, Input,Icon,Card } from 'antd'
const { Meta } = Card;


class SignupForm extends Component {

    state = {
        user: {},
        redirect: false,
        error:false,
        errorsPicker:{user1:false,user2:false,email1:false,email2:false,name:false,password:false}
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to = '/auth/login' />
        }
    }

    signup = (e) => {
        const {user} = this.state
        signup(user)
            .then(r => {
                this.setState({
                    redirect: true
                })
            }).catch(e => {
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
        
//CHECKS EN BASE DE DATOS
        //...CHECK 1
        //buscar usuario repetido
        let busqueda1 = new Promise ((resolve,reject)=>{
            this.lookFor({username: user.username})
            .then(r=>{
            if (r){
            resolve(this.state.errorsPicker.user1=true)
            } else{
            check++
            resolve(this.state.errorsPicker.user1=false)
            }
            })
            .catch(e=>console.log(e))
        })
        //...CHECK 2
        //buscar correo repetido
        let busqueda2 = new Promise ((resolve,reject)=>{
            this.lookFor({email: user.email})
            .then(r=>{
            if (r){
                console.log(user.email)
                console.log("email existe= ",r)

                resolve(this.state.errorsPicker.email1=true)
               
            } else {
                check++
              resolve(this.state.errorsPicker.email1=false)
            }
            })
            .catch(e=>console.log(e))
        })

//CHECKS IN SITU
            //...CHECK 3
        //checando longitud de usuario
        if (user.username === undefined || user.username.length <6 || user.username.length>12){
            this.state.errorsPicker.user2=true
            // console.log("Tu usuario debe ser mayor de 6 caracteres y menor de 12 caracteres")
        }else{
            // console.log("check longitud username")
            this.state.errorsPicker.user2=false
            check++
        }

        //...CHECK 4
        //comprobando correo válido
        if(/(.+)@(.+){2,}\.(.+){2,}/.test(user.email)) {
            check++
            this.state.errorsPicker.email2=false
        }else{this.state.errorsPicker.email2=true}
        
        //...CHECK 5
        //comprobando que valor en el espacio de nombre
        if (user.name===undefined || user.name.length <6 ){
            this.state.errorsPicker.name=true
        }else{
            this.state.errorsPicker.name=false
            check++
        }
        //...CHECK 6
        //comprobando contraseña
        if (user.password===undefined || !user.password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/) ){
            this.state.errorsPicker.password=true
        }else{
            this.state.errorsPicker.password=false
        check++
        }

        Promise.all([busqueda1,busqueda2])
        .then(()=>{
            console.log(this.state.errorsPicker)
            if(check === 6){ 
                this.signup() 
                this.enterLoading()
            }else{this.setState ({error:true})}
        })
        .catch(r=>console.log("no entra al then pero si al catch del promise all"))
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
            <div>{this.renderRedirect()}
            <Card style={{ width: 250, marginTop: 16 }} >
              <Meta
                title="¡Regístrate!"
                // description="LogIn card for PitayaLabs Microcréditos"
            /><hr/>
              <label>
            <form method = "POST"
            onSubmit = {this.checker} >
            <label>
            <Input size="small" placeholder="Usuario" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" name="username" onChange={this.handleText} required/> 
            { this.state.errorsPicker.user1 ? <small className="form-errors"><br/>Excelente nombre, pero ya está en uso, ¡elige uno mejor!</small>: null }
            { this.state.errorsPicker.user2 ? <small className="form-errors"><br/>Tu usuario debe ser mayor de 6 caracteres y menor de 12 caracteres</small>: 
            <small className="form-info"><br/>Tu usuario debe ser mayor de 6 caracteres y menor de 12 caracteres</small> }
            </label><br/><br/>
            <label>
            <Input size="small" placeholder="Nombre completo" type="text" name="name" onChange={this.handleText} required/> 
            { this.state.errorsPicker.name ? <small className="form-errors"><br/>Ingresa tu nombre completo</small>:null}
            </label><br/> < br />
            <label>
            <Input size="small" placeholder="ingresa.tu@correo.com" type="email" name="email" onChange={this.handleText} required/> 
            { this.state.errorsPicker.email1 ? <small className="form-errors"><br/>Este correo ya está en uso, si olvidaste tu contraseña da click <Link to="/">aquí</Link>.</small>: null }
            { this.state.errorsPicker.email2 ? <small className="form-errors"><br/>Ingresa un email válido</small>: null }
            </label><br/> < br />


            <label>
            <Input size="small" placeholder="*******" type="password" name="password" onChange={this.handleText} required/> 
            {this.state.errorsPicker.password ? <small className="form-errors"><br/>Tu contraseña debe ser mayor de 5 caracteres y contener por lo menos un número, una mayúscula y una minúscula</small>: 
            <small className="form-info"><br/>Tu contraseña debe ser mayor de 5 caracteres y contener por lo menos un número, una mayúscula y una minúscula</small> }
            </label><br/ > < br />
            <Button key="submit" htmlType="submit" type="submit" loading={this.state.loading}>Regístrate</Button>
            </form> </label> 
            </Card>
    </div>
        )
    }
}

export default SignupForm