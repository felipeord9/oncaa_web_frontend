import { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useUser from '../../hooks/useUser';
import { sendRecovery } from '../../services/authService';
import { RiArrowGoBackFill } from "react-icons/ri";
import Logo2 from "../../assest/logo2.png";
import { GiSandsOfTime } from "react-icons/gi";
import './styles.css'

export default function SendRecoveryPassword() {
  const { isLogged } = useUser()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [cargando,setCargando] = useState(false)
  const [invalid, setInvalid] = useState(false)
  useEffect(() => {
    if (isLogged) navigate('/inicio');
  }, [isLogged, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault()
    setCargando(true)
    if(email!=='' && email.includes('@') && email.split('@')[1].includes('.')){
      sendRecovery(email)
        .then((data) => {
          setCargando(false)
          Swal.fire({
            title: "¡CORECTO!",
            text: "Se te acaba de enviar el enlace de recuperación, revisa tu correo y sigue los pasos para reestablecer tu contraseña (Tienes 15 minutos para llevar a cabo este proceso)",
            confirmButtonText: "Aceptar",
            confirmButtonColor:'green'
          })
          navigate('/login')
        })
        .catch((error) => {
          setCargando(false)
          Swal.fire({
            title:'¡Uops!',
            text:'Ha ocurrido un error a la hora de mandar el correo electrónico. Verificalo y vuelve a intentarlo. Si el problema persiste comunicate con el área de sistemas.',
            showConfirmButton:true,
            confirmButtonText:'OK',
            confirmButtonColor:'#D92121'
          })
        })
    }else{
      setCargando(false)
      setInvalid(true)
      setTimeout(() => setInvalid(false), 3000)
    }
  }

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
        className="fw-bold mb-2"
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        type='submit'
      >
        {children}
      </button>
    );
  };

  return (
    <div >
      <div className="position-fixed shadow w-100" style={{ fontSize: 20, left: 0, height: "60px", zIndex: 2, userSelect:'none' , backgroundColor:'black'}}>
        <div className="d-flex flex-row justify-content-between w-100 h-100 px-4 shadow">
          <nav className="navbar p-0 m-0">
            <button 
              className="p-2 mt-2 ps-0 " 
              style={{backgroundColor:'black',color:'white'}}
              onClick={(e)=>navigate('/')}
            >
              <RiArrowGoBackFill  className='me-1'/>Atrás
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
          <h1 className='fw-bold w-100 d-flex justify-content-center text-align-center' style={{color:'black'}}><strong>Validar correo</strong></h1>
          <div>
            <h6 className='h6-recovery p-2 border border-2' style={{backgroundColor:'whitesmoke', borderRadius:10}}>Ingresa el correo que diste a la hora de tu registro.</h6>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='input_group mt-3 mb-3 w-100 '>
              <input type='text' id='usuario' className='input_group_input w-100 ' required onChange={(e)=> setEmail(e.target.value)}/>
              <label for="usuario" className='input_group_label'>Correo electrónico</label>
            </div>
            <div className='align-content-center text-align-center align-items-center'>
              <center>
              <BotonColorCambiante type="submit">{cargando ? <strong>Cargando... <GiSandsOfTime /></strong>:<strong>Enviar</strong>}</BotonColorCambiante>
              </center>
            </div>
            <center>
            <label><a href='/login' className='text-decoration-none' style={{fontSize:'medium'}}><strong>Volver al login</strong></a></label>
            </center>
            {invalid && <div className='text-danger text-center mt-2 fw-bold'>Corréo Inválido</div>}
          </form>
        </div>
      </div>
    </div>
    
  )
}