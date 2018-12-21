import React from 'react'
const EditProfile = ({updateProfile, handleText}) => {
  return (
    <div>
      Editar perfil
      <form method="POST" onSubmit={updateProfile}>
      <p>
            Foto de perfil:
            <input type="text" name="imgURL" onChange={handleText}/>
        </p>
        <p>
            Nombre:
            <input type="text" name="name" onChange={handleText}/>
        </p>
        <p>
            Teléfono móvil:
            <input type="text" name="phone" onChange={handleText}/>
        </p>
        <p>
            Ciudad:
            <input type="text" name="city" onChange={handleText}/>
        </p>
        <p>
            Fecha de nacimiento:
            <input type="date" name="birthday" onChange={handleText}/>
        </p>
        <button type="submit">Guardar</button>
      </form>
    </div>
  )
}

export default EditProfile