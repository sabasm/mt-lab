import React, { Component } from 'react'
import SignupFormStaff from './SignupFormStaff'
import {signup} from './services/auth'

class StaffLogin extends Component {

    state={
        staff:{}
    }
    signup=(e)=>{
        const {staff} = this.state
        e.preventDefault()
        signup(staff)
            .then(r=>{
                console.log(r)
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
            <SignupFormStaff
                signup={this.signup}
                handleText={this.handleText}/>
        </div>
    )
  }
}

export default StaffLogin
