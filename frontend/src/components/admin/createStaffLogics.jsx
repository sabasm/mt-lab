import React, { Component } from 'react'
import {getProfile} from '../services/auth'
import {searchFor,createStaff} from '../services/database'
import CreateStaff from './createStaff';
import SelectUsername from './selectUsername';

 class createStaffLogics extends Component {
    state={
        user:{},
        newStaff:{}
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
        const content = this.state
        createStaff(content.newStaff,content.user)
            .then(r=>{
                console.log("data enviada al server")
                
            }).catch(e=>{
                console.log(e)
            })
    }
    searchFor=(e)=>{
        e.preventDefault()
        searchFor({username:e.target.username.value})
            .then(r=>{
                let {newStaff} = this.state
                newStaff=r
                this.setState({newStaff})
                this.props.history.push('/staff/create')
                
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
      if(!loggedUser) this.props.history.push('/auth/login')
      const {pathname} = this.props.location
  
    return (
      <div className="landing-front">
        {pathname==='/staff/new'?
            <SelectUsername
            searchFor={this.searchFor}/>
            :
            <CreateStaff
                updateProfile={this.updateProfile}
                handleText={this.handleText}
                newStaff={this.state.newStaff}/>  
            }
          
      </div>
    )
  }
}
export default createStaffLogics