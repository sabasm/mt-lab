import React from 'react'

const LoginForm = ({staffLogin, user}) => {
  return (
    <div className="all-forms">
      <label>Bienvenido {user.name}:
          <hr/>
      <form method="POST" onSubmit={staffLogin}>
        <label>
            Pin:<br/>
            <input type="number" name="number"/>
        </label><br/><br/>
        <label>
            Password:<br/>
            <input type="password" name="password"/>
        </label><br/><br/>
        <button type="submit">Log in</button>
      </form>
      </label>
    </div>
  )
}

export default LoginForm
