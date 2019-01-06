import React from 'react'

const CreateStaff = ({updateProfile, handleText, newStaff}) => {
  return (
    <div className="all-forms ">
    {console.log("create staff component ",newStaff)}
    <label>Creando cuenta de asociado para <br/>{newStaff.name}:
      <hr/>
      <form method="POST" onSubmit={updateProfile}>
      <small className="important-message">Todos los campos son obligatorios.</small><br/>
        <label>
            Puesto:<br/>
            <input type="text" name="position" onChange={handleText}/>
        </label><br/><br/>
        <label>
            Correo institucional:<br/>
            <input type="email" name="mail" onChange={handleText}/>
        </label><br/><br/>
        <label>
            Documentos:<br/>
            <input type="text" name="documents" onChange={handleText}/>
        </label><br/><br/>
        <label>
            Nivel de confianza:<br/>
            <small>1 es el nivel de acceso más bajo, especial para puestos temporales, becarios y sin capacidad de editar clientes y asociados</small>
            <input type="number" name="access"  onChange={handleText}/>
        </label><br/><br/>
        <button type="submit">Crear</button>
      </form>
      </label>
    </div>
  )
}

export default CreateStaff

/* this.client=false
  this.staff={
    documents: [String],
    mail:String,
    position:String,
    access:{
      type: Number,
      enum: [5,4,3,2,1],
      default: 1
    },
    pin:{type:Number, minlength:7, maxlength:10,default:1234567890},
    convertedBy:String */
