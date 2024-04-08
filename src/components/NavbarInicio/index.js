import React, {useEffect, useState} from 'react';
import Logo2 from "../../assest/logo2.png";
import './styles.css';
import { useLocation } from 'react-router-dom';

function NavbarInicio() {
  const location = useLocation()

  return (
    <div className="navbar-inicio position-fixed shadow w-100 p-0"
      style={{ fontSize: 20, left: 0, height: "60px", zIndex: 2, userSelect:'none' , backgroundColor:'black'}}
    >
      <span className="toggle-btn">&#9776;</span> {/* Icono de hamburguesa para abrir el menú */}
        <nav className="navbar p-0 ms-5">
          <span className='ms-5'>{location.pathname}</span>        
        </nav>
        <div id="logo-header" className="d-flex flex-row align-items-center gap-2">
            <img
                src={Logo2}                       
                unselectable="false"
                aria-invalid        
                alt=""
                style={{ height:45, width:70 , userSelect:'none'}}
            />
            <h2 style={{color:'white'}}> OncaaBox</h2>                       
        </div>    
    </div>
  );
}

export default NavbarInicio;
