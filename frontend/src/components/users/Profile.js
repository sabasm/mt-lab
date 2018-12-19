import React, { Component } from 'react'
import {getProfile} from '../services/auth'

 class ProfilePage extends Component {

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

  render() {
      const {user} = this.state
      const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
      if(!loggedUser) this.props.history.push('/login')
    return (
      <div>
        {console.log(this.user)}
        {user.username}
        <br/>
        {user.email}
      </div>
    )
  }
}
export default ProfilePage