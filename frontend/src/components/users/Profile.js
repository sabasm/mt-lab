import React, { Component } from 'react'
import {getProfile,update} from '../services/auth'
import MyProfile from './myProfile';
import EditProfile from './editProfile';

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
    updateProfile=(e)=>{
        e.preventDefault()
        const {user} = this.state
        update(user)
            .then(r=>{
                console.log("data enviada al server")
                
            }).catch(e=>{
                console.log(e)
            })

    }

    handleText=(e)=>{
        const {user} = this.state
        const field = e.target.name
        user[field] = e.target.value
        this.setState({user})
    }

  render() {
      const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
      if(!loggedUser) this.props.history.push('/')
     // const {path} = this.props.location
  
    return (
      <div className="landing-front">
         {/* {path==='/profile/edit'?
            <EditProfile
                updateProfile={this.updateProfile}
                handleText={this.handleText}
                user/>
            : */}
            {/* <MyProfile/>   */}
            <EditProfile
                updateProfile={this.updateProfile}
                handleText={this.handleText}/>
            
          
      </div>
    )
  }
}
export default ProfilePage