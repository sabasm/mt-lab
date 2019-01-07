import React from 'react'

const VerifyMail =  ({validate, handleText})=>{
  return (
    <div className="message-error">
<small>verifyMail error</small>
    </div>
  )
}
const ActivateAccount =  ({validate, handleText})=>{
    return (
      <div className="message-error">
      <small>activateAccount error</small>
      </div>
    )
  }

  export { VerifyMail }
  export { ActivateAccount }
