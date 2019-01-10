import React, { Component } from 'react'
import {NavLink, Link, withRouter} from 'react-router-dom'
import { logout } from './auth';
import { Menu, Dropdown, Icon } from 'antd';

let menu = (
  <Menu>        
    <Menu.Item key="0">
    <Link className="nav-links nav-inactive" to="/auth/login" activeClassName="nav-selected"><span>Inicia sesión</span></Link>
    </Menu.Item>
    <Menu.Item key="1">
    <Link className="nav-links nav-inactive" to="/auth/signup" activeClassName="nav-selected"><span>Regístrate</span></Link>
    </Menu.Item>

  </Menu>
);
let menuLogged = (
  <Menu>        
      <Menu.Item key="0">
      <Link className="nav-links nav-inactive" to="/profile">Perfil</Link>
      </Menu.Item>
      <Menu.Item key="1">
      <Link className="nav-links nav-inactive" to="/deposit">Configuración de Prestamos</Link>
      </Menu.Item>
      <Menu.Item key="2">
      <Link className="nav-links nav-inactive" to="/profile/edit">Actualizar información</Link>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="4">
      <Link className="nav-links nav-inactive" to="/" onClick={logout} >Cerrar sesión</Link>
      </Menu.Item>
      </Menu>
);
class navbar extends Component {
  state={
    user:{}
}

logout=(e)=>{
  e.preventDefault()
  const {user} = this.state
  logout(user)
      .then(r=>{
          localStorage.removeItem('loggedUser')
          this.props.history.push('/')
          
      }).catch(e=>{
          console.log(e)
      })
    }

  render() {
    const {pathname} = this.props.location

    return (
      
      <nav className="nav-bar">
      
      <section className="nav-bar-logo">
        <NavLink to="/" className="nav-inactive"><img src="https://image.flaticon.com/icons/svg/1155/1155253.svg" height="32" width="32" alt="confiadoz-logo"/></NavLink>
        </section>
        <section className="nav-bar-links-menu">
        {pathname==='/' ?
                    <Dropdown overlay={menu} trigger={['click']}>
                    <Link className="ant-dropdown-link" to="#"><Icon id="menu-icon" type="down-circle" theme="twoTone" twoToneColor="#FFE4C4" />
                    </Link>
                  </Dropdown> 
            :
            <Dropdown overlay={menuLogged} trigger={['click']}>
            <Link className="ant-dropdown-link" to="#"><Icon id="menu-icon" type="down-circle" theme="twoTone" twoToneColor="#FFE4C4" />
            </Link>
          </Dropdown>   
            }
        {/* <NavLink className="nav-links nav-inactive" to="/auth/login" activeClassName="nav-selected"><span>Inicia sesión</span></NavLink> */}
        </section>
      <section className="nav-bar-links-container">
      {pathname==='/' ? <section className="nav-bar-links-container">
      <NavLink className="nav-links nav-inactive" to="/auth/login" activeClassName="nav-selected"><span>Inicia sesión     </span></NavLink>
      <NavLink className="nav-links nav-inactive" to="/auth/signup" activeClassName="nav-selected"><span>Regístrate</span></NavLink> 
      </section>
            :
            <section>
            <NavLink className="nav-links nav-inactive" to="/profile" activeClassName="nav-selected">Perfil     </NavLink>
            <NavLink className="nav-links nav-inactive" to="/deposit">Configuración de Prestamos      </NavLink>
            <NavLink className="nav-links nav-inactive" to="/profile/edit">Actualizar información     </NavLink>
            <NavLink className="nav-links nav-inactive" to="/" onClick={logout} >     Cerrar sesión</NavLink>
            </section>
            }
      
        {/* <NavLink className="nav-links nav-inactive" to="/auth/login" activeClassName="nav-selected"><span>Inicia sesión</span></NavLink> */}
        </section>
      </nav>
    )
  }
}
navbar=withRouter(navbar)
export default navbar