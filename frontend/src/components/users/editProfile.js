import React from 'react'
import { Button,Input,Card } from 'antd'
const { Meta } = Card;

const EditProfile = ({updateProfile, handleText}) => {
  return (
    <div>
            <Card style={{ width: 250, marginTop: 16 }} >
              <Meta
                title="Edita tu perfil"
                description="Es muy importante que ingreses todos tus datos oficiales, ya que serán corroborados para dar acceso a tus prestamos"
            /><hr/>
      <label>
      <form method="POST" onSubmit={updateProfile}>
      <label>
            C.U.R.P.:<br/>
            <Input type="text" name="curp" placeholder="C.U.R.P." onChange={handleText} size="small"  required/> 
        </label><br/><br/>
        <label>
            Nombre completo:<br/>
            <Input type="text" name="name" placeholder="Nombre oficial completo" onChange={handleText} size="small"  required/> 
        </label><br/><br/>
        <label>
            Teléfono móvil:<br/>
            <Input type="number" name="phone" placeholder="Nombre oficial completo" onChange={handleText} size="small"  required/> 
        </label><br/><br/>
        <label>
            Estado:<br/>
            <Input type="text" name="state" placeholder="Entidad Federativa" onChange={handleText} size="small"  required/> 
        </label><br/><br/>
        <label>
            Ciudad:<br/>
            <Input type="text" name="city" placeholder="Ciudad" onChange={handleText} size="small"  required/> 
        </label><br/><br/>
        <label>
            Fecha de nacimiento:<br/>
            <Input type="date" name="birthday" placeholder="Fecha de nacimiento" onChange={handleText} size="small"  required/> 
        </label><br/><br/>
        <Button key="submit" htmlType="submit" type="submit" >Guardar</Button>
      </form>
      </label>
      </Card>
    </div>
  )
}

export default EditProfile