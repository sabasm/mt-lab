import React from 'react'

const LoginForm = ({login, handleText}) => {
  return (
    <div className="all-forms">
      <label>Iniciar sesión:
          <hr/>
      <form method="POST" onSubmit={login}>
        <label>
            Usuario:<br/>
            <input type="text" name="username" onChange={handleText}/>
        </label><br/><br/>
        <label>
            Password:<br/>
            <input type="password" name="password" onChange={handleText}/>
        </label><br/><br/>
        <button type="submit">Log in</button>
      </form>
      </label>
    </div>
  )
}

export default LoginForm
