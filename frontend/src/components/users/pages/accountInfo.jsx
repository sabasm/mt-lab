import React, { Component } from "react";
import { getProfile } from "../../services/auth";
import { Button, Input } from "antd";
import { API_Update } from "../../services/database";
import { Link } from 'react-router-dom'
import {Slider, InputNumber, Row, Col, Card} from 'antd'
const { Meta } = Card;

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
    inputValue: 500,
    inputValueMonths: 1,
    total:0,
    totalMensual:0,
    sliderMove:false
  };

  componentWillMount() {
    this.setState({info:false });
    this.refresh()
  }
  calculate=(months,quantity)=>{

    let base= (((quantity/months)*0.029)+(2.5*months))*1.16;
    let earnings = (base+quantity)*0.15
    let total = (((quantity+earnings)*1.16)+base).toFixed(2)
    let totalMensual=(total/months).toFixed(2)
    this.setState({total,totalMensual,sliderMove:true})
    }
    
    handleText=(e)=>{
      const {user} = this.state
      const field = e.target.name
      user[field] = e.target.value
      this.setState({user})
    }
    onChangeMonth = (value) => {
      this.setState({
        inputValueMonths: value,
      });
      this.calculate(value,this.state.inputValue)
    }
    onChange = (value) => {
      if (Number.isNaN(value)) {
        return;
      }
      this.calculate(this.state.inputValueMonths,value)
      this.setState({
        inputValue: value,
      });
    }
  refresh=()=>{
    getProfile()
      .then(user => {
        this.setState({ user,maxAmount});
        maxAmount=user.costumer.status.maxAmount
        grantedAmount=user.costumer.status.grantedAmount
        this.setState({info:true,debt:grantedAmount,maxAmount})
        window.scrollTo(0, 0)
      })
      .catch(error => {
        console.log(error);
      });
  }

  solicitar=()=>{
    const numberElement=document.getElementById("solicitud")
    let number = numberElement.value
    let month= document.getElementById("monthsNum").value
    if(this.state.user._id===undefined){
      this.setState({session:false})}
    if(number < 500 || number >(this.state.maxAmount+(((number/month)*0.029)+(2.5*month))*1.16)+number*1.15) {
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
    const { inputValueMonths } = this.state;
    const { inputValue } = this.state;
    const { total } = this.state;
    const { totalMensual } = this.state;
    return (
      <div className="account-master">
      {this.state.info ? <section>
    <section className="block-resumen">
      <p>Crédito disponible: <b>${this.state.maxAmount.toFixed(2)}MXN</b></p>
      {this.state.debt ?  <p>Responsabilidad total: <b>${this.state.debt.toFixed(2)}MXN</b></p>:null}
      {this.nextPay ? <p>Monto próximo pago: {this.nextPay}</p>:<p>Estás al día en tus pagos :)</p>}
      {this.nextDueDate ? <p>Fecha limite de pago: {this.nextDueDate}</p>:<hr/>}
      </section>
      <section>
          <img id="landing-logo" src="https://image.flaticon.com/icons/svg/1155/1155253.svg" alt="confiadoz-logo"/>
          
          <Card id="landing-calculator">
          <h1>Confiadoz</h1>
            <h3>¡Si tienes amigos, tienes dinero!</h3>
            <Meta title="¡Calcula el préstamo que necesitas!" description="Arrastra los controles"/><br/>
            <label>
              Elige tu plazo más cómodo en meses
            <Row>
            <Col span={12}><Slider min={1} max={6} onChange={this.onChangeMonth} value={typeof inputValueMonths === 'number' ? inputValueMonths : 0}/>
            </Col>
            <Col span={4}> <InputNumber min={1} max={6} style={{ marginLeft: 16 }} value={inputValueMonths} id="monthsNum" onChange={this.onChangeMonth}/>
            </Col>
          </Row></label>
          <label>
              Elige tu prestamo inicial:
          <Row>
            <Col span={12}>
              <Slider min={500}  max={1000} onChange={this.onChange} value={typeof inputValue === 'number' ? inputValue : 0} step={50}/>
            </Col>
            <Col span={4}> <InputNumber  min={500} max={1000} style={{ marginLeft: 16 }} step={50} value={inputValue} onChange={this.onChange}/>
            </Col>
          </Row>
          </label>
        { this.state.sliderMove ? <div><p>Mensualidades de ${totalMensual}MXN</p><p>Tu pago total sería de <b>${total}MXN</b></p></div>:<div><p>Tu límite aumenta con tus amigos</p><p>Sorpréndete</p></div>}
        <Input hidden type="number" min={500}  value={total} id="solicitud" onChange={this.handleText}></Input>
          <h2><i>by PitayaLabs</i></h2>
          { this.state.sliderMove ? <Button type="primary" onClick={this.solicitar}>solicitar</Button>:null}

            </Card>

            
            </section>
      <Input hidden type="number" min={500} value={inputValue} id="solicitud" onChange={this.handleText}></Input>
      { this.state.session ? null:<small className="form-errors"><br/>Para proceder, <Link to="/auth/login">inicia sesión</Link><br/></small> }
      { this.state.invalid && this.state.session ? <small className="form-errors"><br/>La cantidad mínima a solicitar es de $500MXN, comprueba que tienes fondos suficientes.<br/></small>: null }
      <small>El monto mínimo de solicitud son $500 pesos MXN, tu <b>monto máximo actual</b> es de ${this.state.maxAmount.toFixed(2)}MXN.</small><br/>
      <small><b>¡Aumenta tu monto de crédito invitando a tus amigos!</b></small><br/>
      
      </section>:null}
    </div>)
  }
}
