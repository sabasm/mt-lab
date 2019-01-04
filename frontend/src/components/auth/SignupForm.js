import React, {
    Component
} from 'react'
import {
    signup
} from '../services/auth'
import {
    Redirect
} from 'react-router-dom'
import {
    API_lookFor
} from '../services/database'

class SignupForm extends Component {

    state = {
        user: {},
        redirect: false
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to = '/auth/login' />
        }
    }

    signup = (e) => {
        const {
            user
        } = this.state
        console.log(user)
        signup(user)
            .then(r => {
                console.log(r)
                this.setState({
                    redirect: true
                })
            }).catch(e => {
                console.log(e)
            })
    }

    lookFor = (lookingFor) => {
        return new Promise((resolve, reject) => {
        let exist;
            API_lookFor(lookingFor)
                .then(r => {
                    exist = r.exist
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
            if (r){console.log("Este usuario ya está tomado")}else{
               console.log("check no existe username")
               check++
               resolve()} 
            })
            .catch(e=>console.log(e))
        })
        //...CHECK 2
        //buscar correo repetido
        let busqueda2 = new Promise ((resolve,reject)=>{
            this.lookFor({email: user.email})
            .then(r=>{
            if (r){
                console.log("Este correo ya está en uso, si olvidaste tu contraseña da click aquí")
            }else{
                console.log("check correo no repetido")
                check++
                resolve()
            }
            })
            .catch(e=>console.log(e))
        })

//CHECKS IN SITU
            //...CHECK 3
        //checando longitud de usuario
        if (user.username.length <6 || user.username.length>12){
            console.log("Tú usuario debe ser mayor de 6 caracteres y menor de 12 caracteres")
        }else{
            console.log("check longitud username")
            check++
        }

        //...CHECK 4
        //comprobando correo válido
        if(/(.+)@(.+){2,}\.(.+){2,}/.test(user.email)) {
            check++
            console.log("check correo valido")
        }else{
            console.log("ingresa un email válido")}
        
        //...CHECK 5
        //comprobando que valor en el espacio de nombre
        if (user.name===undefined || user.name.length <6 ){
            console.log("Ingresa un nombre válido")
        }else{
            console.log("check nombre valido")
            check++
        }
        //...CHECK 6
        //comprobando contraseña
        if (user.password===undefined || !user.password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/) ){
            console.log("Tu password debe ser mayor de 5 caracteres y contener por lo menos un número, una mayúscula y una minúscula")
        }else{
            console.log("check contraseña valida")
            check++
        }

        Promise.all([busqueda1,busqueda2])
        .then(()=>{
            if (check === 6) this.signup()
        })
    }


    handleText = (e) => {
        const {
            user
        } = this.state
        const field = e.target.name
        user[field] = e.target.value
        this.setState({
            user
        })
    }

    render() {

        return ( 
        <div className = "all-forms "> {this.renderRedirect()} 
        <label> Registro:
            <hr/>
            <form method = "POST"
            onSubmit = {this.checker} >
            <label>
            Usuario: < br/>
            <input type = "text"
            name = "username"
            onChange = {this.handleText}/> 
            </label><br/> < br/>
            <label>
            Nombre: < br />
            <input type = "text"
            name = "name"
            onChange = {this.handleText}/> 
            </label><br/> < br />
            <label>
            Email: < br/>
            <input type = "email"
            name = "email"
            onChange = {this.handleText}/> 
            </label><br/> < br />
            <label>
            Password: < br />
            <
            input type = "password"
            name = "password"
            onChange = {
                this.handleText
            }
            /> </label><br/ > < br />
            <button type = "submit" > Registrate </button> </form> </label> </div>
        )
    }
}

export default SignupForm