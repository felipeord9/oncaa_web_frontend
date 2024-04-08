import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useUser from '../../hooks/useUser';
import * as Bs from "react-icons/bs";
import { changeRecoveryPassword } from '../../services/authService'
import { RiArrowGoBackFill } from "react-icons/ri";
import Logo2 from "../../assest/logo2.png";
import { HiLogin } from "react-icons/hi";
import { TbLogin } from "react-icons/tb";
import './styles.css'

export default function RecoveryPassword() {
    const { isLogged } = useUser()
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [errorInput, setErrorInput] = useState('')
    const { token } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      if (isLogged) navigate('/inicio');
    }, [isLogged, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault()
    if(newPassword !== confirmNewPassword) {
      setErrorInput('La contraseña nueva no coincide')
      return setTimeout(() => setErrorInput (''), 3000)
    }
    changeRecoveryPassword({token, newPassword})
      .then((data) => {
        Swal.fire({
          title: "¡CORECTO!",
          text: "La contraseña se ha cambiado exitosamente.",
          icon: 'success',
          confirmButtonText: "Aceptar",
          timer: 3000
        })
        navigate('/login')
      })
      .catch((error) => {
        setErrorInput('El token ha expirado, será redirigido al login')
        return setTimeout(() => navigate('/login'), 4000)
      })
  }
  const [shown,setShown]=useState("");
  const switchShown =()=>setShown(!shown);

  const [mostrar,setMostrar]=useState('');
  const switchMostart=()=>setMostrar(!mostrar);

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
              className="pt-2 mt-1" 
              style={{backgroundColor:'black',color:'white'}}
              onClick={(e)=>navigate('/login')}
            >
              <TbLogin className='me-1'/>Ir al login
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
          <h1 className='fw-bold' style={{color:'black'}}><strong>Cambiar contraseña</strong></h1>
          <form onSubmit={handleSubmit} className=''>
            <div className='input_group mt-3 mb-3 w-100 '>
              <input type={shown ? 'text':'password'} id='contraseña' className='input_group_input w-100' required onChange={(e)=> setNewPassword(e.target.value)}/>
              <label for="contraseña" className='input_group_label'>Nueva contraseña</label>
              <span className='position-absolute' onClick={switchShown}  style={{ right: 10, cursor: "pointer",fontSize:25 }}>{shown ? <Bs.BsEye/>:<Bs.BsEyeSlash/>}</span>
            </div>
            <div className='input_group mt-3 mb-3 d-flex flex-column'>
              <input type={mostrar ? 'text':'password'} id='confirm' onChange={(e)=>setConfirmNewPassword(e.target.value)} className='input_group_input' required/>
              <label for='confirm' className='input_group_label'>Ingresar de nuevo</label>
              <span className='position-absolute' onClick={switchMostart}  style={{ right: 10, cursor: "pointer",fontSize:25 }}>{mostrar ? <Bs.BsEye/>:<Bs.BsEyeSlash/>}</span>
            </div>
            <div className='align-content-center text-align-center align-items-center'>
              <center>
              <BotonColorCambiante type="submit"><strong>Reestablecer</strong></BotonColorCambiante>
              </center>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}