import React from 'react'
const EditProfile = ({updateProfile, handleText}) => {
    
  return (
    <div className="all-forms">
      <label>Editar perfil:
          <small className="form-info">
          <br/> Es muy importante que incluyas toda tu información exacta ya que será utilizada para corroborar tus documentos oficiales</small>
          <hr/>
      <form method="POST" onSubmit={updateProfile}>
      <label>
            C.U.R.P.:<br/>
            <input type="text" name="curp" onChange={handleText} required/>
        </label><br/><br/>
        <label>
            Nombre completo:<br/>
            <small className="form-info"><br/>Tal cual aparece en tu credencial de elector, C.U.R.P o acta de nacimiento</small>
            <input type="text" name="name" onChange={handleText} required/>
        </label><br/><br/>
        <label>
            Teléfono móvil:<br/>
            <input type="text" name="phone" onChange={handleText} required/>
        </label><br/><br/>
        <label>
            Estado:<br/>
            <input type="text" name="state" onChange={handleText} required/>
        </label><br/><br/>
        <label>
            Ciudad:<br/>
            <input type="text" name="city" onChange={handleText} required/>
        </label><br/><br/>
        <label>
            Fecha de nacimiento:<br/>
            <input type="date" name="birthday" onChange={handleText} required/>
        </label><br/><br/>
        <button type="submit">Guardar</button>
      </form>
      </label>
    </div>
  )
}

export default EditProfile