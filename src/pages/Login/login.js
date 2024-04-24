import React, { useEffect, useState, useContext } from 'react';
import './login.css';
import AuthContext from "../../context/authContext";
import useUser from '../../hooks/useUser';
import * as Bs from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Fade } from "react-awesome-reveal";
import Swal from "sweetalert2";
import Logo2 from "../../assest/logo2.png";
import { MdArrowBackIosNew } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function Login() {
  const {login,isLoginLoading,hasLoginError,isLogged , logout}=useUser()
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate =useNavigate()
  useEffect(()=>{
    if(isLogged && user.role==='admin')navigate('/clientes');
    if(isLogged && user.role==='recepcionista')navigate('/clientes');
    if(isLogged && user.role==='coach')navigate('/clientes');
  },[isLogged,navigate]);

  const [info,setInfo]=useState({
    usuario:'',
    fechaIngreso: '',
    accion:'0',
    fechaSalida:null,
    macEquipo:null,
  })
  useEffect(()=>{
    if(isLogged && user){
      setInfo({ 
        usuario:user.name,      
        fechaIngreso: new Date(),
      })
    }
  },[isLogged])

  const handleLogin=async(e)=>{
    e.preventDefault();
    login({email,password})
    /* navigate('/clientes') */
    logout()
  }

  const [shown,setShown]=useState("");
  const switchShown =()=>setShown(!shown);

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
      transform: hover ? 'scale(1.2)' : 'scale(1)',
      transition: 'all 0.3s ease',
    };
    return (
      <button
        className="fw-bold"
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        type='submit'
        onSubmit={handleLogin}
      >
        {children}
      </button>
    );
  };

  return(
    <div >
      <div className="position-fixed shadow w-100" style={{ fontSize: 20, left: 0, height: "60px", zIndex: 2, userSelect:'none' , backgroundColor:'black'}}>
        <div className="d-flex flex-row justify-content-between w-100 h-100 px-4 shadow">
          <nav className="navbar p-0 m-0">
            <button 
              className="p-2 mt-2 ps-0 " 
              style={{backgroundColor:'black',color:'white'}}
              onClick={(e)=>navigate('/')}
            >
              <RiArrowGoBackFill  className='me-1'/>Atras
            </button>
          </nav>
            <div
              id="logo-header"
              className="d-flex flex-row align-items-center gap-2"
            >
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
      </div>
      <div className='container d-flex justify-content-center align-items-center ' style={{height:'100vh'}}>
        <div className='content text-align-center shadow-lg border-light rounded-4 border border-3 p-4 ' style={{backgroundColor:'white'}}> 
          <h1 className='fw-bold pb-1 w-100 d-flex justify-content-center text-align-center h1-login'><strong className=''>Inicio de sesión</strong></h1>
          <form onSubmit={handleLogin} className=''>
            <div className='input_group m-5 mt-4 mb-0 d-flex '>
              <input type='text' id='usuario' className='input_group_input w-100 ' required onChange={(e)=> setEmail(e.target.value)}/>
              <label for="usuario" className='input_group_label '>Usuario</label>
            </div>
            <div className='input_group m-5 mt-3 mb-3 d-flex flex-column'>
              <input type={shown ? 'text':'password'} onChange={(e)=>setPassword(e.target.value)} id='email' className='input_group_input' required/>
              <label for="email" className='input_group_label'>Contraseña</label>
              <span className='position-absolute' onClick={switchShown} style={{ right: 10, cursor: "pointer",fontSize:25 }}>{shown ? <Bs.BsEye/>:<Bs.BsEyeSlash/>}</span>
            </div>
            <div className='align-content-center text-align-center align-items-center'>
              <center>
                {/* <button type="submit" style={{backgroundColor:'black',color:'white'}} ><strong>Entrar</strong></button> */}
                <BotonColorCambiante>Ingresar</BotonColorCambiante>
              </center>
            </div>
            <center>
            <label className='mt-1'><a href='/send/recovery' className='text-decoration-none' style={{fontSize:'medium'}}><strong>¿Olvidaste tu constraseña?</strong></a></label>
            </center>
          </form>
          {isLoginLoading && <div className='loading'>Cargando...</div>}
          {hasLoginError && <div className='text-danger text-center mt-2'>Credenciales Incorrectas</div>}
        </div>
      </div>
    </div>
    )
  }
