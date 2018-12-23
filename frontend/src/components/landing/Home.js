import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="component-container">
  <div className="landing-front">
    <h1>PitayaLabs</h1>
    <h3>¡Bienvenido a una nueva forma de hacer crédito!</h3>
    </div>
<div className="landing-info">
<div className="landing-info-cards">
<section>
<img src="" alt="entrepreneur-students-logo"/>
    <h2>Estudiantes empresarios</h2>
    <p>Queremos apoyar a los estudiantes en apuros y los nuevos empresarios que busquen mejorar la sociedad</p>
    </section>
    <section>
  <img src="" alt="micro-empresas-logo"/>
    <h2>Micro-empresas</h2>
    <p>Perfecto para personas trabajadoras que necesitan un ingreso extra para solucionar situaciones de inmediato</p>
    </section>
    <section>
  <img src="" alt="social-logo"/>
    <h2>Social</h2>
    <p>Invita a tus amigos y conocidos, entre más invitados tengas, ¡tu monto de prestamo subirá proporcionalmente!</p>
    </section>
</div>
  <div className="landing-info-invest"> 
  <img src="" alt="investment-logo"/>
    <h3>¡Invierte con nosotros!</h3>
    <h2>¿Que te parece un ingreso extra?</h2>
    <p>Cualquier usuario puede convertirse en inversor con sólo 100 pesos, gana hasta el 3.5% de tu inversión, y recibe un descuento de 2% en tus préstamos</p>
    </div>
</div>
  </div>
  
  )

export default Home;