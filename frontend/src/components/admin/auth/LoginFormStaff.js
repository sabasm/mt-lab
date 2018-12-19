import React from 'react'

const LoginFormStaff = ({login, handleText}) => {
  return (
    <div>
      Login
      <form method="POST" onSubmit={login}>
        <p>
            Email:
            <input type="password" name="email" onChange={handleText}/>
        </p>
        <p>
            Password:
            <input type="password" name="password" onChange={handleText}/>
        </p>
        <p>
            pin:
            <input type="password" name="pin" onChange={handleText}/>
        </p>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default LoginFormStaff
