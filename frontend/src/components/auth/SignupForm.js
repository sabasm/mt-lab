import React from 'react'

const SignupForm = ({signup, handleText}) => {
  return (
    <div>
      Signup
      <form method="POST" onSubmit={signup}>
        <p>
            Usuario:
            <input type="text" name="username" onChange={handleText}/>
        </p>
        <p>
            Nombre:
            <input type="text" name="personalData.name" onChange={handleText}/>
        </p>
        <p>
            Email:
            <input type="email" name="email" onChange={handleText}/>
        </p>
        <p>
            Password:
            <input type="password" name="password"  onChange={handleText}/>
        </p>
        <button type="submit">Registrate</button>
      </form>
    </div>
  )
}

export default SignupForm
