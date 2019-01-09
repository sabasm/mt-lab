import React, { Component } from 'react'
import LoginForm from '../auth/LoginForm';
import {login} from '../services/auth'
import BackgroundVideo from './background';
import { Button , Input, Icon,Slider, InputNumber, Row, Col, Card} from 'antd'
const { Meta } = Card;

export default class Home extends Component {
  state={
    user:{},
    inputValue: 200,
    inputValueMonths: 3,
    total:0,
    totalMensual:0
}
calculate=(months,quantity)=>{
/* Openpay by bbva rates:
Visa y MasterCard 2.9% + $2.5 MXN 1 day delay
Tarjetas American Express 2.9% + $2.5 MXN 3 days delay
Tiendas de conveniencia 2.9% + $2.5 MXN 3 days delay
SPEI $8 MXN 1 day delay  aprox = 200 * 2.9% + 2.5

that means that our start rate would be 8 pesos for 200, base, only for paying the third party
*/
let base= ((quantity*1.029)+(2.5*months))*1.16;
let earnings = base*0.15
let total = (base+earnings)
let totalMensual=(total/months).toFixed(2)
this.setState({total,totalMensual})
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
login=(e)=>{
  e.preventDefault()
  const {user} = this.state
  login(user)
      .then(r=>{
          localStorage.setItem('loggedUser',JSON.stringify(r))
          //console.log('logged',r)
          this.props.history.push('/profile')
          
      }).catch(e=>{
          console.log(e)
      })
}

  render() {
    const { inputValueMonths } = this.state;
    const { inputValue } = this.state;
    const { total } = this.state;
    const { totalMensual } = this.state;
    
    return (

      <div className="component-container-video">
      <div className="landing-front">

      <BackgroundVideo/>
      <section className="landing-title">
      <img id="landing-logo" src="https://image.flaticon.com/icons/svg/1155/1155253.svg" height="180" width="180" alt="confiadoz-logo"/>
      
      <Card id="landing-calculator">
      
      <h1>PitayaLabs Microcréditos</h1>
        <h3>¡Si tienes amigos, tienes dinero!</h3>
        <Meta title="¡Calcula el préstamo que necesitas!" description="Arrastra los controles"/><br/>
        <label>
          Elige tu plazo más cómodo en meses
        <Row>
        <Col span={12}>
          <Slider
            min={3}
            max={32}
            onChange={this.onChangeMonth}
            value={typeof inputValueMonths === 'number' ? inputValueMonths : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={1}
            max={32}
            style={{ marginLeft: 16 }}
            value={inputValueMonths}
            onChange={this.onChangeMonth}
          />
        </Col>
      </Row></label>
      <label>
          Elige tu prestamo inicial:
      <Row>
        <Col span={12}>
          <Slider
            min={200}
            max={1000}
            onChange={this.onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
            step={50}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={200}
            max={1000}
            style={{ marginLeft: 16 }}
            step={50}
            value={inputValue}
            onChange={this.onChange}
          />
        </Col>
      </Row>
      </label>
      <p>Pagarías solamente {total.toFixed(2)}</p>
      <p>Mensualmente {totalMensual}</p>
        
        

        </Card>
        </section>
        <section className="login-form">
        <LoginForm
                login={this.login}
                handleText={this.handleText}/>
        </section>
        </div>
    <div className="landing-info">
    <div className="landing-info-cards">
    <section>
    <img src="https://image.flaticon.com/icons/svg/201/201818.svg" height="120" width="120" alt="entrepreneur-logo"/>
        <b>
        <h2>Estudiantes emprendedores</h2>
        <p>Queremos apoyar a los estudiantes en apuros y los nuevos empresarios que busquen mejorar la sociedad</p>
        </b>
        </section>
       
        <section>
          <b>
      <img src="https://image.flaticon.com/icons/svg/1049/1049867.svg" height="120" width="120" alt="social-logo"/>
        <h2>Social</h2>
        <p>Invita a tus amigos y conocidos, entre más invitados tengas, ¡tu monto de prestamo subirá proporcionalmente!</p>
        </b>
        </section>

        <section>
      <img src="https://image.flaticon.com/icons/svg/1055/1055646.svg" height="120" width="120" alt="micro-empresas-logo"/>
        <b>
        <h2>Micro-empresas</h2>
        <p>Perfecto para personas trabajadoras que necesitan un ingreso extra para solucionar situaciones de inmediato</p>
        </b>
        </section>
    </div>
      <div className="landing-info-invest"> 
      <img src="https://image.flaticon.com/icons/svg/877/877627.svg" height="120" width="120" alt="investment-logo"/>
        <b>
        <h3>¡Invierte con nosotros!</h3>
        <h2>¿Que te parece un ingreso extra?</h2>
        <p>Cualquier usuario puede convertirse en inversor con sólo 100 pesos, gana hasta el 3.5% de tu inversión, y recibe un descuento de 2% en tus préstamos</p>
        </b>
        </div>
    </div>
      </div>
      
    )
  }
}
