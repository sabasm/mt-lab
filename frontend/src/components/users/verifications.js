import React from 'react'
import { Link } from 'react-router-dom'

const VerifyMail =  ({validate, handleText})=>{
  return (
    <div className="message-error">
<small>Verifica tu correo electrónico para poder abrir tu <b>Configuración de Prestamos</b></small>
    </div>
  )
}
const ActivateAccount =  ({validate, handleText})=>{
    return (
      <div className="message-info">
      <Link to='/deposit'><small>Para poder activar tu limite de prestamos inicial, completa la información de <b>Configuración de Prestamos</b></small></Link>
      </div>
    )
  }
  const OficialData =  ({validate, handleText})=>{
    return (
      <div className="message-info">
      <Link to='/profile/edit'><small>Para poder solicitar tus prestamos, registra tu información <b>oficial</b></small></Link>
      </div>
    )
  }

  export { VerifyMail,OficialData,ActivateAccount }
