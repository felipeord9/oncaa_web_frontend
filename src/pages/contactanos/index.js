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
    const correo = 'ooncabox@gmail.com';
    const handleClick = () => {
      window.location.href = `mailto:${correo}`;
    };

    return(
    <div>
        <NavPublico/>
        <div className="container-fluid mt-3">
          <center>
            <h1 className="w-100 pt-5 pb-5" style={{backgroundColor:'whitesmoke'}}>CONTACTANOS</h1>
          </center>
          <div className="row ">
            <div className="col p-5 col-12 col-md-12 col-lg-6 border-right text-align-center d-flex flex-column">
              <div className="p-3">
                <label>NOMBRE</label>
                <input className="form-control form-control-sm border border-0" style={{backgroundColor:'whitesmoke'}} type="text"/>
              </div>
              <div className="p-3">
                <label>EMAIL</label>
                <input className="form-control form-control-sm border border-0" style={{backgroundColor:'whitesmoke'}} type="email"/>
              </div>
              <div className="p-3">
                <label>MENSAJE</label>
                <textarea
                  id="observations"
                  className="form-control border border-0"
                  style={{ minHeight: 70, maxHeight: 100, fontSize: 12 , backgroundColor:'whitesmoke'}}
                ></textarea>              
              </div>
              <div className="d-flex w-100 justify-content-start p-3">
                <button>Enviar<BsSendFill className="ms-2" /></button>
              </div>
            </div>
            <div className="col p-5 col-12 col-md-12 col-lg-6 text-align-center d-flex flex-column">
              <div className="d-flex flex-row p-3">
                <FontAwesomeIcon onClick={handleFacebookClick} style={{width:40,height:40}} className="facebook-icon ms-3" icon={faFacebook} />
                <FontAwesomeIcon onClick={handleInstagramClick} style={{width:40,height:40}} className="instagram-icon ms-3" icon={faInstagram} />

              </div>
              <h5>Oonca Organization</h5>
              <label className="text-secondary">Cl. 58 # 26 - 45, Palmira, Valle del Cauca</label>
              <a className="mt-1" href={`mailto:${correo}`} onClick={handleClick}>{correo}</a>
              <label className="text-secondary mt-2"><FaPhone className="me-1"/>315 697 3320</label>
            </div>
          </div>
        </div>
    </div>
    )
}