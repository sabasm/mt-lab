import React, {Component} from 'react'
import {API_ResetAccess} from '../services/auth'
import {Redirect} from 'react-router-dom'
import {API_lookFor} from '../services/database'
import { Link } from 'react-router-dom'
import { Button } from 'antd'


class ResetAccess extends Component {

    state = {
        user: {},
        redirect: false,
        success:false,
        error:false,
        errorsPicker:{email1:false,email2:false}
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to = '/' />
        }
    }

    resetAccess = (e) => {
        const {user} = this.state
        let email = {email:user.email}
        this.lookFor(email)
        .then(r=>{
            API_ResetAccess(email)
            .then(r=>{
                return console.log(r);
            })
        })
        .catch(e=>console.log(e))
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
        if (!this.state.success){
        let check=0;
        const {user} = this.state
        
//CHECK EN BASE DE DATOS
        //buscar correo
        let busqueda2 = new Promise ((resolve,reject)=>{
            if (user.email !== undefined){
            this.lookFor({email: user.email})
            .then(r=>{
                if (r){
                resolve(this.state.errorsPicker.email1=false)
                check++
            }else {
                    resolve(this.state.errorsPicker.email1=true)
                  }
                
            })
            .catch(e=>console.log(e))
        }else {
            resolve(this.state.errorsPicker.email1=true)
          }
        })

//CHECKS IN SITU
            //...CHECK 2
        //comprobando correo válido
        if(/(.+)@(.+){2,}\.(.+){2,}/.test(user.email) && user.email!==undefined) {
            check++
            this.state.errorsPicker.email2=false
        }else{this.state.errorsPicker.email2=true}


        busqueda2.then(()=>{
            console.log(this.state.errorsPicker)
            console.log(check)
            if(check===2){
                this.resetAccess()
                this.setState ({success:true})
            }else{
                this.setState ({error:true})
            }
        })
        .catch(r=>console.log(r)
        )
        }
        else{
            this.setState ({redirect:true})
        }
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
        <div className = "all-forms "> {this.renderRedirect()} 
        <label> ¿Olvidaste tus datos de acceso?:
            <hr/>
            <form method = "POST"
            onSubmit = {this.checker} >
            {this.state.success ? 

            <div><small className="form-info"><br/>¡Te hemos enviado un correo!</small>
            <br/>< br/>      
            <Button key="submit" htmlType="submit" type="submit" loading={this.state.loading} onClick={this.enterLoading}>Continuar</Button>
            </div>
            :
            <div>
            <label>Ingresa tu correo: < br/>
            <input type = "email" name = "email" onChange = {this.handleText} required/> 
            { this.state.errorsPicker.email1 ?   <small className="form-errors"><br/>¡Oops!, no tenemos este correo registrado, compruebalo o crea tu cuenta <Link to="/auth/signup">aquí</Link></small>:null }

            { this.state.errorsPicker.email2 ? 
            <small className="form-errors"><br/>
            Al parecer este correo no es válido.</small>: null}
            </label><br/>< br/>
            <Button key="submit" htmlType="submit" type="submit" loading={this.state.loading} onClick={this.enterLoading}>Recuperar acceso</Button>
            </div>}
            </form> </label> </div></div></div>
        )
    }
}

export default ResetAccess