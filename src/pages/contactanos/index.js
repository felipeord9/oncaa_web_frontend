import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavPublico from '../../components/NavPublico'
import * as FaIcons from "react-icons/fa";
import Checkbox from '@mui/material/Checkbox';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import './styles.css';
import { FaPhone } from "react-icons/fa6";
import { BsSendFill } from "react-icons/bs";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Logo2 from "../../assest/logo2.png";

export default function Contactanos(){
    const [showSideBar, setShowSidebar] = useState(false);
    const navigate = useNavigate();
    const labelMegusta = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const handleInstagramClick = () => {
      // Redirigir a la página de Instagram
      window.location.href = 'https://www.instagram.com/';
    };
    const handleFacebookClick = () => {
      // Redirigir a la página de Instagram
      window.location.href = 'https://es-la.facebook.com/';
    };
    const correo = 'oncaabox@gmail.com';
    const handleClick = () => {
      window.location.href = `mailto:${correo}`;
    };

    return(
    <div className="App">
        <NavPublico/>
        <div className="container-fluid w-100">
          <div className="row pt-5">
          <div className="col p-5 col-12 col-md-12 col-lg-6 border-right ">
            <center className="p-5" style={{backgroundColor:'black',color:'white',borderRadius:30}}>
              <h1 className="fw-bold" style={{fontSize:'52'}}>¿Ya tienes Suscripción?</h1>
              <label>¡Verifica el estado de tu suscripción, en dos simples pasos!</label>
              <div className="d-flex flex-row justify-content-center text-align-center mt-5">
                <h2>1.</h2>
                <label className="mt-2">ingresa el número de tu documento de identificación</label>
              </div>
              <input
                className="form-control form-control-sm w-50"
                placeholder="123456789"
                id="identificacion"
                type="number"
              />
              <div className="d-flex flex-row justify-content-center text-align-center mt-2">
                <h2>2.</h2>
                <label className="mt-2">Oprime Verificar</label>
              </div>
              <button style={{backgroundColor:'#9A9A9A',color:"white"}} >Verificar</button>
            </center>
          </div>
            <div className="col p-5 col-12 col-md-12 col-lg-6 text-align-center d-flex flex-column">
              <center>
              <h1 className="fw-bold" style={{fontSize:52}}>Contactanos</h1>
              <div className="d-flex flex-column w-50">
                <TextField id="outlined-basic" className="mb-2" size="small" label="Nombre Completo" variant="outlined" />
                <TextField id="outlined-basic" className="mb-2" size="small" label="Celular" variant="outlined" />
                <TextField id="outlined-basic" className="mb-2" size="small" label="someone@gmail.com" variant="outlined" />
                <TextField
                  id="outlined-multiline-static"
                  label="Mensaje"
                  multiline
                  rows={3}
                  defaultValue=""
                />  
                <div className="w-100 ">
                <button style={{backgroundColor:'#000000',color:"white"}} className="mt-2 d-flex justify-content-center text-align-center">
                  <BsSendFill className="me-1 mt-1"/>Enviar
                </button>            
                </div>
              </div>
              </center>
            </div>
          </div>
        </div>
        <footer>
          <div className="container-fluid mt-5 d-flex justify-content-center text-align-center" style={{backgroundColor:'black', color:'white'}}>
            <div className="row">
            <div className="col p-4 ps-5 col-12 col-md-12 col-lg-12 justify-content-end text-align-end d-flex">
              <img className="mt-4 ms-4" src={Logo2} style={{height:130,width:190}}/>
              <div className="d-flex flex-column ms-3">
                  <div className="d-flex flex-row p-3">
                    <FontAwesomeIcon onClick={handleFacebookClick} style={{width:40,height:40}} className="facebook-icon ms-3" icon={faFacebook} />
                    <FontAwesomeIcon onClick={handleInstagramClick} style={{width:40,height:40}} className="instagram-icon ms-3" icon={faInstagram} />
                  </div>
                  <h5>Oncaa Organization</h5>
                  <label className="">Cl. 58 # 26 - 45, Palmira, Valle del Cauca</label>
                  <a className="mt-1" href={`mailto:${correo}`} onClick={handleClick}>{correo}</a>
                  <label className=" mt-2"><FaPhone className="me-1"/>315 697 3320</label>
              </div>
            </div> 
            </div>             
          </div>
        </footer>
    </div>
    )
}