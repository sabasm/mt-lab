import React from 'react'

const CardForm = ({validate, handleText}) => {
  return (
    <div className="all-forms">
      <label>Ingresa tus datos bancarios:
          <hr/>
      <form method="POST" onSubmit={validate}>
      <label>
            Nombre en tarjeta:<br/>
            <input type="text" name="name" onChange={handleText} required/>
        </label><br/><br/>
        <label>
            16 digitos de tarjeta:<br/>
            <input type="number" name="number" onChange={handleText} required/>
        </label><br/><br/>
        <label>
            Fecha de caducidad:<br/>
            mes/año (MM/AA):<br/>
            <section id="año-mes">
            <input type="number" name="exp_month" placeholder="02" onChange={handleText} required/>/<input type="number" name="exp_year" placeholder="20" onChange={handleText} required/>
            </section>
        </label><br/>
        <label>
            cvc:<br/>
            <input type="number" name="cvc" placeholder="123" onChange={handleText} required/>
        </label><br/><br/>
        <label>
            Dirección:<br/>
            <input type="text" name="street1" placeholder="Calle Constituyentes #301" onChange={handleText} required/>
            <input type="text" name="street2" placeholder="Col. Misión del Real" onChange={handleText} required/>
            <input type="text" name="city" placeholder="Hermosillo" onChange={handleText} required/>
            <input type="text" name="state" placeholder="Sonora" onChange={handleText} required/>
            <input type="number" name="zip" placeholder="83100" onChange={handleText} required/>
            <input hidden type="number" name="country" placeholder="México" onChange={handleText} required/>
        
        </label><br/><br/>
        <button type="submit">Enviar</button>
      </form>
      </label>
    </div>
  )
}

export default CardForm