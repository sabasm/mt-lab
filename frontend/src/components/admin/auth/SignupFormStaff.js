import React from 'react'


const SignupFormStaff = ({signup, handleText}) => {
  return (
    <div>
      Registro de staff
      <form method="POST" onSubmit={signup}>
      <p>
            Foto de perfil:
            <input type="text" name="personalData.imgURL" onChange={handleText}/>
        </p>
        <p>
            Nombre:
            <input type="text" name="personalData.name" onChange={handleText}/>
        </p>
        <p>
            Puesto:
            <input type="text" name="position" onChange={handleText}/>
        </p>
        <p>
            Tipo de acceso: (Confianza,RH,TechSupport,Temporal):
            <input type="text" name="access" onChange={handleText}/>
        </p>
        <p>
            Email:
            <input type="email" name="email" onChange={handleText}/>
        </p>
        <p>
            Fecha de nacimiento:
            <input type="date" name="personalData.birthday" onChange={handleText}/>
        </p>
        <p>
            Ciudad:
            <input type="text" name="personalData.city" onChange={handleText}/>
        </p>
        <p>
            Documentos:
            <input type="text" name="documents" onChange={handleText}/>
        </p>
        <p>
            Password de sistema:
            <input type="password" name="password" value="PitayaLab"  onChange={handleText}/>
        </p>
        <button type="submit">Registrate</button>
      </form>
    </div>
  )
}

export default SignupFormStaff