import React, { Component } from 'react'
import {getProfile} from '../services/auth'

 class staffLogin extends Component {

    state={
        user:{}
    }

    componentWillMount(){
        getProfile()
            .then(user=>{
                this.setState({user})
            }).catch(error=>{
                console.log(error)
            })
    }
    stafflogin(){

    }

  render() {
      const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
      if(!loggedUser) this.props.history.push('/')
     // const {path} = this.props.location
  
    return (
      <div className="landing-front">
            <staffLogin 
            user={this.user}
            staffLogin={this.staffLogin}/>
            
          
      </div>
    )
  }
}
export default staffLogin