import React from 'react'
const EditProfile = ({updateProfile, handleText}) => {
  return (
    <div className="all-forms">
      <label>Editar perfil:
          <hr/>
      <form method="POST" onSubmit={updateProfile}>
      <label>
            Foto de perfil:<br/>
            <input type="text" name="imgURL" onChange={handleText}/>
        </label><br/><br/>
        <label>
            Nombre:<br/>
            <input type="text" name="name" onChange={handleText}/>
        </label><br/><br/>
        <label>
            Teléfono móvil:<br/>
            <input type="text" name="phone" onChange={handleText}/>
        </label><br/><br/>
        <label>
            Ciudad:<br/>
            <input type="text" name="city" onChange={handleText}/>
        </label><br/><br/>
        <label>
            Fecha de nacimiento:<br/>
            <input type="date" name="birthday" onChange={handleText}/>
        </label><br/><br/>
        <button type="submit">Guardar</button>
      </form>
      </label>
    </div>
  )
}

export default EditProfile