import React, { Component } from 'react'
import {getProfile} from '../services/auth'
import { VerifyMail, ActivateAccount } from './verifications';

export default class myDashboard extends Component {
  state={
    active:{},
    emailVerificated:{}
}

  componentWillMount(){
    let local = JSON.parse(localStorage.getItem('loggedUser'))
    console.log(local)
    this.setState({active:local.costumer.status.active,emailVerificated:local.emailVerificated})
    getProfile()
        .then(user=>{
            this.setState({user})
        }).catch(error=>{
            console.log(error)
        })
}
  render() {
    return (
      <div>
      {this.state.emailVerificated ? null:<VerifyMail/>}
      {this.state.active ? null:<ActivateAccount/>}
      

              <div className="profiles-container">
        <div className="profiles-container-cover">

        </div>
        <h2>nombre</h2>
        <hr/>
            <div className="followers">
            <h4>2 invitados</h4>
            </div>
            <hr/>
            <h3>prestamos and stuff...</h3>
            <p>Die sehr weiter die gezagt die dich dich. So doch mutter manchmal du wo großer der, sanft heut still in.</p>
      </div>
      </div>
    )
  }
}