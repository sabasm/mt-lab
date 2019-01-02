import React from 'react'

const SelectUsername = ({searchFor}) => {
  return (
    <div className="all-forms ">
    <label>Buscar usuario:
      <hr/>
      <form method="POST" onSubmit={searchFor}>
        <label>
            Nombre de usuario:<br/>
            <input type="text" name="username"/>
        </label><br/><br/>
        <button type="submit">Continuar</button>
      </form>
      </label>
    </div>
  )
}
export default SelectUsername