import React from 'react'

const CardForm = ({validate, handleText}) => {
  return (
    <div>
      CardForm
      <form method="POST" onSubmit={validate}>
      <p>
            Nombre registrado en tarjeta:
            <input type="text" name="name" onChange={handleText}/>
        </p>
        <p>
            Numero de tarjeta:
            <input type="number" name="number" onChange={handleText}/>
        </p>
        <p>
            Fecha de caducidad:
            <label>Mes:<input type="number" name="exp_month" placeholder="01" onChange={handleText}/></label>
            <label>Año: 20<input type="number" name="exp_year" placeholder="01" onChange={handleText}/></label>
        </p>
        <p>
            CVC:
            <input type="number" name="cvc" placeholder="123" onChange={handleText}/>
        </p>
        <p>
            Dirección:
            <input type="text" name="street1" placeholder="Calle Constituyentes 301" onChange={handleText}/>
            <input type="text" name="street2" placeholder="Col. Misión del Real" onChange={handleText}/>
            <input type="text" name="city" placeholder="Hermosillo" onChange={handleText}/>
            <input type="text" name="state" placeholder="Sonora" onChange={handleText}/>
            <input type="number" name="zip" placeholder="83100" onChange={handleText}/>
            <input hidden type="number" name="country" placeholder="México" onChange={handleText}/>
        
        </p>
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default CardForm