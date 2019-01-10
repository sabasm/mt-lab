import React, { Component } from 'react'
import {getProfile,update} from '../services/auth'
import MyDashboard from './myDashboard';
import EditProfile from './editProfile';
import { API_Update } from '../services/database';

import { withRouter} from 'react-router-dom'

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
         API_Update(changes)
             .then(r => {
                this.setState({
                    redirect: true
                })
                this.props.history.push('/profile')
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
      const {pathname} = this.props.location
    return (
      <div className="landing-front">
          {pathname==='/profile/edit'  ? <EditProfile updateProfile={this.updateProfile} handleText={this.handleText}/>:<MyDashboard/>}       
    
     </div>
    )
  }
}
ProfilePage=withRouter(ProfilePage)
export default ProfilePage
       