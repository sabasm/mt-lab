import React, { Component } from "react";
import { getProfile } from "../../services/auth";
import { Button, Input } from "antd";
import { API_Update } from "../../services/database";
import { Link } from 'react-router-dom'

let maxAmount
let grantedAmount

export default class AccountInfo extends Component {
  state = {
    user:{},
    maxAmount:{},
    nextPay:{},
    nextDueDate:{},
    debt:{},
    info:false,
    invalid:false,
    session:true,
  };

  componentWillMount() {
    this.setState({info:false });
    this.refresh()
  }

  refresh=()=>{
    getProfile()
      .then(user => {
        this.setState({ user,maxAmount});
        maxAmount=user.costumer.status.maxAmount
        grantedAmount=user.costumer.status.grantedAmount
        this.setState({info:true,debt:grantedAmount})
      })
      .catch(error => {
        console.log(error);
      });
  }

  solicitar=()=>{
    const numberElement=document.getElementById("solicitud")
    let number = numberElement.value
    if(this.state.user._id===undefined){
      this.setState({session:false})}
    if(number < 200 || number >this.state.maxAmount) {
      numberElement.placeholder = "Ingresa una cantidad válida"
      this.setState({invalid:true})
    }else{
    this.setState({info:false})
    this.updateData(number)
  }}

  updateData=(number)=>{
    let id = {_id:this.state.user._id}
    let newMaxAmount = this.state.maxAmount - number
    let totalGranted = parseFloat(number)+parseFloat(grantedAmount)
    let updates= {
      costumer:{
        status:{
          maxAmount:newMaxAmount,
          grantedAmount:totalGranted
        }
      }
    }

    let changes = { id , updates}
      API_Update(changes)
      .then(r => {
        this.refresh()

      })
      .catch(e=>console.log("ERROR @ API_UPDATE: ",e))
  }

  render() {
    return (
      <div className="landing-front">
      <div className="Demo-container">
      {this.state.info ? <section>
    <section className="block-resumen">
      <p>Crédito disponible: <b>${this.state.maxAmount}MXN</b></p>

      {this.state.debt ?  <p>Responsabilidad total: <b>${this.state.debt}MXN</b></p>:null}
      {this.nextPay ? <p>Monto próximo pago: {this.nextPay}</p>:<p>Estás al día en tus pagos :)</p>}
      {this.nextDueDate ? <p>Fecha limite de pago: {this.nextDueDate}</p>:<hr/>}
      </section>
      <Input type="number" max={this.maxAmount} id="solicitud" onChange={this.handleText}></Input>
      { this.state.session ? null:<small className="form-errors"><br/>Para proceder, <Link to="/auth/login">inicia sesión</Link><br/></small> }
      { this.state.invalid && this.state.session ? <small className="form-errors"><br/>La cantidad mínima a solicitar es de $200MXN, comprueba que tienes fondos suficientes.<br/></small>: null }
      <small>El monto mínimo de solicitud son $200 pesos MXN, tu <b>monto máximo actual</b> es de ${this.state.maxAmount}MXN.</small><br/>
      <small><b>¡Aumenta tu monto de crédito invitando a tus amigos!</b></small><br/>
      
      <Button type="primary" onClick={this.solicitar}>solicitar</Button>
      </section>:null}
    </div>
    </div>)
  }
}
