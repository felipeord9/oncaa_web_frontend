import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavPublico from '../../components/NavPublico'
import * as FaIcons from "react-icons/fa";
import './styles.css';
import { NavBarData } from "./NavbarData";
import Hombre from '../../assest/hombre_doing_ejercise.jpg'
import Portada from '../../assest/portada.png'
import Portada2 from '../../assest/portada2.png'
import Portada3 from '../../assest/portada3.png'
import Logo2 from "../../assest/logo2.png";
import { FaPhone } from "react-icons/fa6";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import Fuerte from '../../assest/fuerte.png'
import Pesa from '../../assest/pesa.png'
import Mujer from '../../assest/mujer_doing.png'
import Brazo from '../../assest/brazo.png'
import Diego from '../../assest/diego.png'
import Gian from '../../assest/yian.png'

export default function AcercaNostros(){
    const [showSideBar, setShowSidebar] = useState(false);
    const handleInstagramClick = () => {
      // Redirigir a la página de Instagram
      window.location.href = 'https://www.instagram.com/oncaabox?igsh=ejRxZndjdmZlNW5o';
    };
    const handleFacebookClick = () => {
      // Redirigir a la página de Instagram
      window.location.href = 'https://www.facebook.com/oncaabox?mibextid=ZbWKwL';
    };
  const correo = 'oncaaweb@gmail.com';
  const handleClick = () => {
    window.location.href = `mailto:${correo}`;
  };
    return(
    <div>
        <NavPublico/>
        <div className="background-container">
          <div
            className="background-image"
            style={{
              backgroundImage: `url(${Portada3})`, // Ruta a tu imagen de fondo
              height: '600px', // Altura deseada
            }}
          >
          </div>
        </div>
        <div className="w-100 container mt-3">
          <div 
            className="col d-flex flex-row justify-content-center text-align-center" 
          >
            <img className="image-fuerte me-4" src={Fuerte} style={{width:150}}/>
            <div className="w-100">
              <h2 className="w-100 justify-content-center d-flex fw-bold"><strong>Nosotros</strong></h2>
              <label style={{fontSize:18}}>OncaaBox es un centro  de acondicionamiento físico integral con múltiples actividades  deportivas en tendencia dirigidas al público general y a la formación de  atletas</label>
            </div>
          </div>
        </div>
        <div className="container mt-4 shadow p-3">
          <div className="row">
            <div 
              className="col col-12 col-md-6 col-lg-4 top-0 justify-content-center text-align-center d-flex flex-row" 
              style={{borderRight:'5px solid #EED112'}}
            >
              <img src={Pesa} style={{width:80}}/>
              <h5 className="ms-5 h-100 justify-content-center text-align-center mt-3">Objetivo 1</h5>
            </div>
            <div 
              className="col col-12 col-md-6 col-lg-4 top-0 justify-content-center text-align-center d-flex flex-row" 
              style={{borderRight:'5px solid #EED112'}}
            >
              <img src={Mujer} style={{width:80}}/>
              <h5 className="ms-5 h-100 justify-content-center text-align-center mt-3">Objetivo 2</h5>
            </div>
            <div 
              className="col col-12 col-md-6 col-lg-4 top-0 justify-content-center text-align-center d-flex flex-row" 
            >
              <img src={Brazo} style={{width:80}}/>
              <h5 className="ms-5 h-100 justify-content-center text-align-center mt-3">Objetivo 3</h5>
            </div>
          </div>
        </div>
        <h1 className="w-100 d-flex justify-content-center mt-5">Nuestros Entrenadores</h1>
        <div className="container mt-3">
          <div className="row d-flex justify-content-center text-alig-center align-items-center" style={{justifyContent:'space-between'}}>
            <div 
              className="col col-12 col-md-4 col-lg-3 top-0  justify-content-center text-align-center d-flex flex-column" 
              style={{ justifyContent:'center', textAlign:'center', alignItems:'center'}}
            >
              <div className="d-flex flex-column w-100 p-5 shadow justify-content-center text-align-center d-flex" style={{borderBottom:'5px solid #EED112'}}>
                <div className="w-100 d-flex justify-content-center text-align-center">
                  <img src={Diego} className="w-75 justify-content-center d-flex" />
                </div>
                <label className="mb-0 pb-0">Diego Fernando</label>
                <label className="mt-0 pt-0">Sánchez</label>
              </div>
            </div>
            <div 
              className="col col-12 col-md-4 col-lg-3 top-0  justify-content-center text-align-center d-flex flex-column" 
              style={{justifyContent:'center', textAlign:'center', alignItems:'center'}}
            >
              <div className="d-flex flex-column w-100 p-5 shadow" style={{borderBottom:'5px solid #EED112'}}>
                <div className="w-100 d-flex justify-content-center text-align-center">
                  <img src={Gian} className="w-75 justify-content-center d-flex"  />
                </div>                
                <label className="mb-0 pb-0">Gian Carlos</label>
                <label className="mt-0 pt-0">Urbano</label>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row w-100 d-flex flex-row justify-content-center text-align-center align-items-center">
          <h5 className="mt-3 mb-3 ms-3">Si deseas saber más a detalle la disponibilidad de cada uno de nuestros entrenadores, da un fuerte clic en <a href="/horarios">Horarios</a>.</h5>
        </div>
        <footer>
                <div className="container-fluid" style={{backgroundColor:'black', color:'white'}}>
                    <div className="row">
                    <div className="col p-4 ps-5 col-12 col-md-12 col-lg-12 justify-content-center text-align-center d-flex w-100">
                    <img className="mt-4 ms-0 logo h-70" src={Logo2} />
                    <div className="d-flex flex-column ">
                        <div className="d-flex flex-row ">
                            <FontAwesomeIcon onClick={handleFacebookClick} style={{width:40,height:40}} className="facebook-icon ms-3" icon={faFacebook} />
                            <FontAwesomeIcon onClick={handleInstagramClick} style={{width:40,height:40}} className="instagram-icon ms-3" icon={faInstagram} />
                        </div>
                        <h5>OncaaBox</h5>
                        <label className="">Cl. 58 # 26 - 45, Palmira, Valle del Cauca</label>
                        <label><a className="mt-1 d-flex" href={`mailto:${correo}`} onClick={handleClick}>{correo}</a></label>
                        <label className=" mt-2"><FaPhone className="me-1"/>315 697 3320</label>
                    </div>
                    </div> 
                    </div>             
                </div>
            </footer>
    </div>
    )
}