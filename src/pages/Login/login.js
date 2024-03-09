import React, { useEffect, useState, useContext } from 'react';
import './login.css';
import AuthContext from "../../context/authContext";
import useUser from '../../hooks/useUser';
import * as Bs from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Fade } from "react-awesome-reveal";
import Swal from "sweetalert2";

export default function Login() {
  const {login,isLoginLoading,hasLoginError,isLogged}=useUser()
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate =useNavigate()
  useEffect(()=>{
    if(isLogged && user.role==='agencias' || isLogged && user.role==='cartera')navigate('/inicio');
    if(isLogged && user.role==='compras')navigate('/compras');
    if(isLogged && user.role==='admin')navigate('/inicio/admin');
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
  }

  const [shown,setShown]=useState("");
  const switchShown =()=>setShown(!shown);

  return(
    <div className=" wrapper d-flex justify-content-center align-items-center vh-100 w-100 m-auto " style={{userSelect:'none'}}>
      <div className='rounder-4'>
      <div className='login-wrapper p-2 shadow-lg border-light rounded-4 border border-3 bg-gradient d-flexjustify-content-between ' style={{backgroundColor:'white'}}>
      <Fade cascade direction='down'>
      </Fade>
      <h1 style={{color:'black'}}><strong>Log In</strong></h1>
      <form onSubmit={handleLogin} className=''>
        <div className='input_group m-3 '>
          <input type='text' id='usuario' className='input_group_input' required onChange={(e)=> setEmail(e.target.value)}/>
          <label for="usuario" className='input_group_label'>Usuario</label>
        </div>
        <div className='input_group m-3 d-flex flex-column'>
          <input type={shown ? 'text':'password'} onChange={(e)=>setPassword(e.target.value)} id='email' className='input_group_input' required/>
          <label for="email" className='input_group_label'>Contraseña</label>
          <span className='position-absolute' onClick={switchShown} style={{ right: 10, cursor: "pointer",fontSize:25 }}>{shown ? <Bs.BsEye/>:<Bs.BsEyeSlash/>}</span>
        </div>
        <div className='align-content-center text-align-center align-items-center'>
          <center>
          <button type="submit" ><strong>Entrar</strong></button>
          </center>
        </div>
        <center>
        <label><a href='/send/recovery' className='text-decoration-none' style={{fontSize:'medium'}}><strong>¿Olvidaste tu constraseña?</strong></a></label>
        </center>
      </form>
      {isLoginLoading && <div className='loading'>Cargando...</div>}
      {hasLoginError && <div className='text-danger text-center mt-2'>Credenciales Incorrectas</div>}
    </div>
    </div>
    </div>
  )
}