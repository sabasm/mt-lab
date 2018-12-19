import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Home</h1>
    <Link to='/auth/login'>
      <button>Login</button>
    </Link>
  </div>
  
  )

export default Home;