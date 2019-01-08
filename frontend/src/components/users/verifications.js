import React from 'react'

const VerifyMail =  ({validate, handleText})=>{
  return (
    <div className="message-error">
<small>Verifica tu correo electrónico para poder abrir tu <b>Configuración de Créditos</b>, si no recibiste nuestro correo da click en este mensaje</small>
    </div>
  )
}
const ActivateAccount =  ({validate, handleText})=>{
    return (
      <div className="message-info">
      <small>Para poder activar tu crédito, completa la información de <b>Configuración de Créditos</b></small>
      </div>
    )
  }

  export { VerifyMail }
  export { ActivateAccount }
