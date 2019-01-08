import React, { Component } from 'react'
import {getProfile,update} from '../services/auth'
import MyDashboard from './myDashboard';
import EditProfile from './editProfile';
import { API_Update } from '../services/database';

 class ProfilePage extends Component {

    state={
        user:{},
        fullUser:false,
        redirect:{}
    }

    componentWillMount(){
        let local = JSON.parse(localStorage.getItem('loggedUser'))
        this.setState({fullUser:local.fullUser})
        getProfile()
            .then(user=>{
                this.setState({user})
            }).catch(error=>{
                console.log(error)
            })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <MyDashboard/>
        }
    }
    updateProfile=(e)=>{
        e.preventDefault()
        const {user} = this.state
        update(user)
        const updates= {fullUser:true}
        const id = {_id:this.state.user._id}
        let changes = { id , updates}
        console.log (changes)
         API_Update(changes)
             .then(r => {
                this.setState({
                    redirect: true
                })
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
    return (
      <div className="landing-front"> 
          {!this.state.fullUser  ? <EditProfile updateProfile={this.updateProfile} handleText={this.handleText}/>:<MyDashboard/>}       
     </div>
    )
  }
}
export default ProfilePage