import React from 'react'

const SignupForm = ({signup, handleText}) => {
  return (
    <div className="all-forms ">
    <label>Registro:
      <hr/>
      <form method="POST" onSubmit={signup}>
        <label>
            Usuario:<br/>
            <input type="text" name="username" onChange={handleText}/>
        </label><br/><br/>
        <label>
            Nombre:<br/>
            <input type="text" name="personalData.name" onChange={handleText}/>
        </label><br/><br/>
        <label>
            Email:<br/>
            <input type="email" name="email" onChange={handleText}/>
        </label><br/><br/>
        <label>
            Password:<br/>
            <input type="password" name="password"  onChange={handleText}/>
        </label><br/><br/>
        <button type="submit">Registrate</button>
      </form>
      </label>
    </div>
  )
}

export default SignupForm
