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
import { findByCedula , findByOncaaID } from "../../services/clienteService";
import { sendMailPublico } from "../../services/mailPublicoService";
import Swal from "sweetalert2";
import { GiSandsOfTime } from "react-icons/gi";

export default function Contactanos(){
    const [showSideBar, setShowSidebar] = useState(false);
    const navigate = useNavigate();
    const labelMegusta = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [cedula,setCedula] = useState('');
    const [nombre,setNombre] = useState('');
    const [celular,setCelular] = useState('');
    const [gmail,setGmail] = useState('');
    const [mensaje,setMensaje] = useState('');
    const [cargando,setCargando] = useState(false)
    const [verificar,setVarificar] = useState(false);
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

    const BotonColorCambiante = ({ children }) => {
      const [hover, setHover] = useState(false);
      const handleMouseEnter = () => {
        setHover(true);
      };
      const handleMouseLeave = () => {
        setHover(false);
      };
      const buttonStyle = {
        cursor: 'pointer',
        backgroundColor:'black',
        color:'white',
        transform: hover ? 'scale(1.1)' : 'scale(1)',
        transition: 'all 0.3s ease',
      };
      return (
        <button
          className="fw-bold mt-2"
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          type='submit'
          onClick={(e)=>handleSendMail(e)}
        >
          {children}
        </button>
      );
    };

    const handleVerificar = (e) => {
      e.preventDefault();
      setVarificar(true)
      if(cedula===''){
        setVarificar(false)
        Swal.fire({
          title:'¡Oups!',
          text:'Debes ingresar tu número de identificación para poder hacer la verificación.',
          showConfirmButton:true,
          confirmButtonColor:'red'
        })
      }else{
        findByCedula(cedula)
        .then(({data})=>{
          setVarificar(false)
          if(data?.suscripcion?.tipo==='Día' || data?.suscripcion?.tipo === 'Mensualidad'){
            Swal.fire({
              title:`Bienvenido, Señor@ ${data.nombre}`,
              text:`Su tipo de suscripción es: ${data.suscripcion.tipo}, la cual se registro el día: ${new Date(data.suscripcion.fechaInicio).toLocaleDateString()}, por lo cual finaliza el día: ${new Date(data.suscripcion.fechaFinaliza).toLocaleDateString()}.`,
              showCloseButton:true,
              confirmButtonColor:'green'
            })
          }else{
            setVarificar(false)
            Swal.fire({
              title:`Bienvenido, Señor@ ${data.nombre}`,
              text:`Su tipo de suscripción es: ${data.suscripcion.tipo}, la cual se registro el día: ${new Date(data.suscripcion.fechaInicio).toLocaleDateString()}, y te quedan: ${data.suscripcion.diasFaltantes} dias.`,
              showCloseButton:true,
              confirmButtonColor:'green'
            })
          }
          setCedula('')
        })
        .catch(()=>{
          findByOncaaID(cedula)
          .then(({data})=>{
            setVarificar(false)
            if(data?.suscripcion?.tipo==='Día' || data?.suscripcion?.tipo === 'Mensualidad'){
              Swal.fire({
                title:`Bienvenido, Señor@ ${data.nombre}`,
                text:`Su tipo de suscripción es: ${data.suscripcion.tipo}, la cual se registro el día: ${new Date(data.suscripcion.fechaInicio).toLocaleDateString()}, por lo cual finaliza el día: ${new Date(data.suscripcion.fechaFinaliza).toLocaleDateString()}.`,
                showCloseButton:true,
                confirmButtonColor:'green'
              })
            }else{
              setVarificar(false)
              Swal.fire({
                title:`Bienvenido, Señor@ ${data.nombre}`,
                text:`Su tipo de suscripción es: ${data.suscripcion.tipo}, la cual se registro el día: ${new Date(data.suscripcion.fechaInicio).toLocaleDateString()}, y te quedan: ${data.suscripcion.diasFaltantes} dias.`,
                showCloseButton:true,
                confirmButtonColor:'green'
              })
            }
            setCedula('')
          })
          .catch(()=>{
            setVarificar(false)
            Swal.fire({
              icon:'warning',
              title:`¡Oups!`,
              text:`No te tenemos agregado a nuestra base de datos. Acercate al establecimiento, realiza el pago y podrás disfrutar de todos los beneficios de Oncaa Box.`,
              showCloseButton:true,
              confirmButtonColor:'red'
            })
          })
        })
      }
    }

    const handleSendMail = (e) => {
      e.preventDefault();
      setCargando(true)
      if(nombre==='' || celular==='' || gmail==='' || mensaje===''){
        Swal.fire({
          title:'¡Oups!',
          text:'Debes de llenar todos los campos para poder hacer la petición.',
          showConfirmButton:true,
          confirmButtonColor:'red'
        })
        setCargando(false)
      }else{
        const body={
          nombre:nombre,
          celular:celular,
          gmail:gmail,
          mensaje:mensaje,
        }
        sendMailPublico(body)
        .then(()=>{
          setCargando(false)
          Swal.fire({
            title:'¡Perfecto!',
            text:'Se ha enviado tu solicitud. Pronto se podrán en contacto contigo y te darán una respuesta.',
            showConfirmButton:true,
            confirmButtonColor:'green'
          })
          setCelular('')
          setGmail('')
          setNombre('')
          setMensaje('')
        })
        .catch(()=>{
          Swal.fire({
            icon:'warning',
            title:`¡Oups!`,
            text:`Ha ocurrido un error a la hora de enviar la solicitud. Intentalo mas tarde.`,
            showCloseButton:true,
            confirmButtonColor:'red'
          })
          setCargando(false)
        })
      }
    }

    return(
    <div className="App">
        <NavPublico/>
        <div className="container-fluid">
          <div className="row" >
          <div className="col padin col-12 col-md-12 col-lg-6 border-right ">
            <center className="padin" style={{backgroundColor:'black',color:'white',borderRadius:30}}>
              <h1 className="fw-bold" style={{fontSize:'52'}}>¿Ya tienes suscripción?</h1>
              <label>¡Verifica el estado de tu suscripción, en dos simples pasos!</label>
              <div className="d-flex flex-row justify-content-center text-align-center mt-5">
                <h2>1.</h2>
                <label className="mt-2">Ingresa el número de tu documento de identificación</label>
              </div>
              <input
                className="form-control form-control-sm cedula "
                placeholder="123456789"
                id="identificacion"
                value={cedula}
                onChange={(e)=>setCedula(e.target.value)}
                type="number"
              />
              <div className="d-flex flex-row justify-content-center text-align-center mt-2">
                <h2>2.</h2>
                <label className="mt-2">Oprime Verificar</label>
              </div>
              <button onClick={(e=>handleVerificar(e))} style={{backgroundColor:'#9A9A9A',color:"white"}} >{verificar ? <strong>Cargando... <GiSandsOfTime /></strong>:<strong>Verificar</strong>}</button>
            </center>
          </div>
            <div className="col p-5 margin-contac col-12 col-md-12 col-lg-6 text-align-center align-items-center d-flex flex-column" >
              <h1 className="fw-bold contactanos" ><strong>Contáctanos</strong></h1>
              <div className="d-flex flex-column nombre-contactanos">
                <TextField 
                  id="outlined-basic " 
                  value={nombre}
                  onChange={(e)=>setNombre(e.target.value)}
                  className="mb-2 w-100" size="small" 
                  label="Nombre Completo" 
                  variant="outlined" 
                />
                <TextField 
                  value={celular}
                  onChange={(e)=>setCelular(e.target.value)}
                  id="outlined-basic" 
                  type="number"
                  className="mb-2" size="small" 
                  label="Celular" variant="outlined" 
                />
                <TextField 
                  id="outlined-basic" 
                  value={gmail}
                  onChange={(e)=>setGmail(e.target.value)}
                  className="mb-2" size="small" 
                  type="email"
                  label="someone@gmail.com" variant="outlined" 
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Mensaje"
                  value={mensaje}
                  onChange={(e)=>setMensaje(e.target.value)}
                  multiline
                  rows={3}
                  defaultValue=""
                />  
                <div className="w-100 d-flex justify-content-center text-align-center align-items-center">
                {/* <button style={{backgroundColor:'#000000',color:"white"}} className="mt-2 d-flex justify-content-center text-align-center"> */}
                  <BotonColorCambiante><BsSendFill className="me-1 mt-1"/>{cargando ? <strong>Cargando... <GiSandsOfTime /></strong>:<strong>Enviar</strong>}</BotonColorCambiante>
                {/* </button> */}            
                </div>
              </div>
            </div>
          </div>
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