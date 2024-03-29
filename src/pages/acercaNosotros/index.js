import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavPublico from '../../components/NavPublico'
import * as FaIcons from "react-icons/fa";
import './styles.css';
import { NavBarData } from "./NavbarData";
import Hombre from '../../assest/hombre_doing_ejercise.jpg'
import Fuerte from '../../assest/fuerte.png'
import Pesa from '../../assest/pesa.png'
import Mujer from '../../assest/mujer_doing.png'
import Brazo from '../../assest/brazo.png'

export default function AcercaNostros(){
    const [showSideBar, setShowSidebar] = useState(false);

    return(
    <div>
        <NavPublico/>
        <div className="background-container">
          <div
            className="background-image"
            style={{
              backgroundImage: `url(${Hombre})`, // Ruta a tu imagen de fondo
              height: '600px', // Altura deseada
            }}
          >
            <div className="text-overlay">
              <h1>Tu texto aquí</h1>
              <p>Otro texto, descripciones, etc.</p>
            </div>
          </div>
        </div>
        <div className="w-100 container mt-5">
          <div 
            className="col d-flex flex-row justify-content-center text-align-center" 
          >
            <img src={Fuerte} style={{width:150}}/>
            <div className="w-75 ms-5">
              <h2 className="w-100 justify-content-center d-flex">Nosotros</h2>
              <label>Texto que refiere a OncaaBox de manera muy resumida, directa y que interese al usuario. a continuación de plantean los objetivos del centro físico</label>
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
          <div className="row" style={{justifyContent:'space-between'}}>
            <div 
              className="col col-12 col-md-4 col-lg-3 top-0  justify-content-center text-align-center d-flex flex-column" 
              style={{ justifyContent:'center', textAlign:'center', alignItems:'center'}}
            >
              <div className="d-flex flex-column w-100 p-5 shadow justify-content-center text-align-center d-flex" style={{borderBottom:'5px solid #EED112'}}>
                <div className="w-100 d-flex justify-content-center text-align-center">
                  <img src={Fuerte} className="w-75 justify-content-center d-flex" />
                </div>
                <label className="mb-0 pb-0">Entrenador N.1</label>
                <label className="mt-0 pt-0">Especialidad</label>
              </div>
            </div>
            <div 
              className="col col-12 col-md-4 col-lg-3 top-0  justify-content-center text-align-center d-flex flex-column" 
              style={{ justifyContent:'center', textAlign:'center', alignItems:'center'}}
            >
              <div className="d-flex flex-column w-100 p-5 shadow justify-content-center text-align-center d-flex" style={{borderBottom:'5px solid #EED112'}}>
                <div className="w-100 d-flex justify-content-center text-align-center">
                  <img src={Fuerte} className="w-75 justify-content-center d-flex" />
                </div>
                <label className="mb-0 pb-0">Entrenador N.2</label>
                <label className="mt-0 pt-0">Especialidad</label>
              </div>
            </div>
            <div 
              className="col col-12 col-md-4 col-lg-3 top-0  justify-content-center text-align-center d-flex flex-column" 
              style={{justifyContent:'center', textAlign:'center', alignItems:'center'}}
            >
              <div className="d-flex flex-column w-100 p-5 shadow" style={{borderBottom:'5px solid #EED112'}}>
                <div className="w-100 d-flex justify-content-center text-align-center">
                  <img src={Fuerte} className="w-75 justify-content-center d-flex"  />
                </div>                <label className="mb-0 pb-0">Entrenador N.3</label>
                <label className="mt-0 pt-0">Especialidad</label>
              </div>
            </div>
            <div 
              className="col col-12 col-md-4 col-lg-3 top-0  justify-content-center text-align-center d-flex flex-column" 
              style={{justifyContent:'center', textAlign:'center', alignItems:'center'}}
            >
              <div className="d-flex flex-column w-100 p-5 shadow" style={{borderBottom:'5px solid #EED112'}}>
                <div className="w-100 d-flex justify-content-center text-align-center">
                  <img src={Fuerte} className="w-75 justify-content-center d-flex"  />
                </div>                
                <label className="mb-0 pb-0">Entrenador N.4</label>
                <label className="mt-0 pt-0">Especialidad</label>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row" style={{justifyContent:'space-between'}}>
          <h5 className="w-100 d-flex justify-content-center text-align-center mt-3 mb-3">Si deseas saber más a detalle la disponibilidad de cada uno de nuestros entrenadores, da un fuerte clic en <a className="ms-1" href="/">Horarios</a></h5>
        </div>
    </div>
    )
}