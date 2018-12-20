import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import {Link} from 'react-router-dom'
import {logout} from './components/services/auth'

class App extends Component {

  componentDidMount () {
    const script = document.createElement('script')
    script.src = 'https://cdn.conekta.io/js/latest/conekta.js'
    script.async = true
    document.body.appendChild(script)
    
  }
  logout=(e)=>{
    e.preventDefault()
    const {user} = this.state
    logout(user)
        .then(r=>{
            localStorage.removeItem('loggedUser')
            this.props.history.push('/home')
            
        }).catch(e=>{
            console.log(e)
        })

}
  render() {
    return (
      <div className="App">
        <nav>
          <Link to ="/auth/login">Login</Link>
          <Link to="/auth/signup">Signup</Link>
          <Link to="/" onClick={logout} >Logout</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/auth/elogin">staff login</Link>
        </nav>
        <Routes />
      </div>
    );
  }
}

export default App;