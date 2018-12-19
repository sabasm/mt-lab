import React, { Component } from 'react'
import LoginFormStaff from './LoginFormStaff'
import {login} from './services/auth'

class StaffLogin extends Component {

    state={
        staff:{}
    }

    login=(e)=>{
        e.preventDefault()
        const {staff} = this.state
        login(staff)
            .then(r=>{
                localStorage.setItem('loggedStaff',JSON.stringify(r))
                console.log('logged Staff',r)
                this.props.history.push('/e/dashboard')
                
            }).catch(e=>{
                console.log(e)
            })

    }

    handleText=(e)=>{
        const {staff} = this.state
        const field = e.target.name
        staff[field] = e.target.value
        this.setState({staff})
    }

  render() {
    return (
      <div>
            <LoginFormStaff
                login={this.login}
                handleText={this.handleText}/>
        </div>
    )
  }
}

export default StaffLogin
