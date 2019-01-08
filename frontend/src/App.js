import React, { Component } from 'react';
import './App.css';
import Routes from './Routes';
import Navbar from './components/services/navbar'
import "antd/dist/antd.css";

class App extends Component {

  componentDidMount () {
    const script = document.createElement('script')
    script.src = 'https://cdn.conekta.io/js/latest/conekta.js'
    script.async = true
    document.body.appendChild(script)
  }

  render() {
    return (
      <div className="App">
        <Navbar/>
        <Routes />
      </div>
    );
  }
}

export default App;