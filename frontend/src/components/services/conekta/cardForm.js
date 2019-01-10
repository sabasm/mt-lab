import React from 'react'
import { Button, Input,Card } from 'antd'
const { Meta } = Card;


const CardForm = ({validate, handleText}) => {

  return (
        <div>
            <Card style={{ width: 300, marginTop: 16 }} >
              <Meta
                title="Ingresa tus datos bancarios"
                // description="LogIn card for PitayaLabs Microcréditos"
            /><hr/>
      <label>
      <form method="POST" onSubmit={validate}>
      <label>
      <Input size="small" placeholder="Nombre Completo" type="text" name="name" required/> 
        </label><br/><br/>
        <label>
        <Input size="small" placeholder="16 digitos de tarjeta" type="number" name="number" required/> 
        </label><br/><br/>
        <label>
        Fecha de caducidad:
            <section id="año-mes">
            <Input size="small" placeholder="MM" type="number" name="exp_month" required/> 
            <Input size="small" placeholder="AA" type="number" name="exp_year" required/> 
            </section>
        </label><br/>
        <label>
        <Input size="small" placeholder="123" type="number" name="cvc" required/> 
        </label><br/><br/>
        <label>
            Dirección:<br/>
            <Input size="small" placeholder="Calle Constituyentes #301" type="text" name="street1" required/> 
            <Input size="small" placeholder="Col. Misión del Real" type="text" name="street2" required/> 
            <Input size="small" placeholder="Hermosillo" type="text" name="city" required/> 
            <Input size="small" placeholder="Sonora" type="text" name="state" required/> 
            <Input size="small" placeholder="83100" type="number" name="zip" required/> 
            <Input hidden size="small" placeholder="México" value="México" type="text" name="country"/>         
        </label><br/><br/>
        <Button key="submit" htmlType="submit" type="submit" >Guardar</Button>
      </form>
      </label>
      </Card>
    </div>
      )
}

export default CardForm