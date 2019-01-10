import React, { Component } from 'react'
import {getProfile} from '../services/auth'
import { VerifyMail, ActivateAccount, OficialData } from './verifications'
import AccountInfo from './pages/accountInfo';
export default class myDashboard extends Component {
  state={
    user:{},
    name:{},
    emailVerificated:{},
    oficial:{},
    card:{},
}
  componentWillMount(){
    let local = JSON.parse(localStorage.getItem('loggedUser'))
    this.setState({user:local,
      emailVerificated:local.emailVerificated,name:local.name})

    getProfile()
    .then(user=>{
      this.setState({user,
        emailVerificated:user.emailVerificated,
        oficial:user.personalData.phone.number,
        card:user.card.name,
        name:user.name})
    }).catch(error=>{
        console.log(error)
    })
}


  render() {
    return (
     
       <div>
      <section className="messages-display">
      {this.state.emailVerificated ? null:<VerifyMail/>}
      {this.state.oficial ? null:<OficialData/>}
      {this.state.card ? null: <ActivateAccount/>}
      {/* {this.state.active===false && this.state.emailVerificated===false ? null:<Link to="/deposit"><ActivateAccount/></Link>} */}
      </section>
      <h2>Bienvenido a tu cuenta {this.state.name}</h2>
      {this.state.emailVerificated && this.state.oficial && this.state.card ? <AccountInfo/>:null}
      {/* <SideMenu/>
      <section>
        <section className="messages-display">
      {this.state.emailVerificated ? null:<Link to="/newmailcode"><VerifyMail/></Link>}
      {this.state.active===false && this.state.emailVerificated===false ? null:<Link to="/credits"><ActivateAccount/></Link>}
      </section>
      <section className="user-panel-info">
      
      <h1><div style={{ height: '100%' }} >

        <p>{this.state.name}</p>
      </div></h1>
          <section className="user-panel-menu">
          <ul>
            <li><b>Configuración de Créditos</b></li>
            <li><b>Mi PitayaCard</b></li>
            <li>Cómo funciona</li>
            <li>Beneficios</li>
            <li>Ingresos extra</li>
            <li>Tutoriales</li>
            <li>Editar Información</li>
            <li>Cerrar sesión</li>
          </ul>
          </section>
      <section className="user-panel-blocks">
      <p>here shall be information blocks:</p>
      <hr/>
      
      <AccountInfoBlock/>

      <StatusBlock/>

      <PartnersBlock/> 

      <TutorialsBlock/> 
      <hr/>
<section className="user-panel-cardowner">
<p>here shall be PitayaCard Stuff and news!</p>
<hr/>
{this.state.pitayaCardOwner ? <ForCardsOwnerBlock/>:<GetOurCardBlock/> }
<hr/>
</section>
      </section>
      <section className="user-panel-invites">
      <p>here shall be  invitations and social interaction</p>
      <hr/>
{/*           
          <YourInvites/> 
              <section className="user-panel-invite"/>
                  <EmailInvite/>
                  <SocialInvites/> 
                 
              </section>
      </section>
      <hr/>
      
      </section> */}
      </div>
    )
  }
}