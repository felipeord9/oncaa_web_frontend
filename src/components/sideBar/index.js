import React, {useState } from 'react';
import Usuario from "../../assest/usuario.png";
import Entrenador from "../../assest/entrenador.png";
import Roles from "../../assest/roles.png";
import UsuarioBlack from "../../assest/usuario-black.png";
import EntrenadorBlack from "../../assest/entrenador-black.png";
import RolesBlack from "../../assest/roles-black.png";
import './styles.css';
import Swal from 'sweetalert2';
import { Link, useLocation , useNavigate } from 'react-router-dom';

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cerrarSesion = (e) =>{
    e.preventDefault();
    Swal.fire({
      icon:'question',
      title:'Cierre de Sección',
      text:'¿Estás segur@ que deseas cerrar sección?',
      showConfirmButton:true,
      confirmButtonColor:'green',
      confirmButtonText:'Confirmar',
      
      showCancelButton:true,
      cancelButtonColor:'red',
      cancelButtonText:'Cancelar'
    }).then(({isConfirmed})=>{
      if(isConfirmed){
        navigate('/')
      }
    })
  }

  const [button1Color, setButton1Color] = useState(''); // Estado del color del botón 1
  const [button2Color, setButton2Color] = useState(''); // Estado del color del botón 2
  const [button3Color, setButton3Color] = useState('')

  const location = useLocation();
  const precisa = location.pathname;

  const handleOptionChange = (event) => {
    // Según la opción seleccionada, actualiza el color de cada botón
    switch (precisa) {
      case '/clientes':
        setButton1Color('white');
        setButton2Color('transparent');
        setButton3Color('transparent');
        break;
      case '/entrenadores':
        setButton1Color('transparent');
        setButton2Color('white');
        setButton3Color('transparent');
        break;
      case '/roles':
        setButton1Color('transparent');
        setButton2Color('transparent');
        setButton3Color('white');
        break;
      default:
        setButton1Color('transparent');
        setButton2Color('transparent');
        setButton3Color('transparent');
    }
  };

  return (
      <div className={`sidebar ${isMenuOpen ? 'compressed' : ''}`}>
        <span className="menu-bars m-0 menu-toggle" style={{ cursor: "pointer"}}>
            <button className="toggle-btn fw-bold" style={{border:'5px solid transparent'}} onClick={toggleMenu}>
              ☰
            </button>
        </span>
          <ul className='ul-inicio '>
            {/* <div className='h-100 d-flex flex-column justify-content-center text-align-center align-items-center' style={{backgroundColor:'green'}}> */}
              
              <button onClick={(e)=>navigate('/clientes')} style={{backgroundColor:'transparent'}} className='d-flex flex-row w-90 li-inicio me-1'>
                {/* <button> */}
                <div className='w-35 d-flex' >
                  <img src={Usuario} style={{width:65}} className='me-3 p-0'/>
                </div>
                <div className='w-75 d-flex justify-content-start text-align-start pt-3'>
                  Clientes
                </div>
                {/* </button> */}
              </button>
              <button onClick={(e)=>navigate('/entrenadores')} style={{backgroundColor:'transparent'}} className='d-flex flex-row w-90 li-inicio' >
                <div className='w-35 d-flex' >
                  <img src={Entrenador} style={{width:65}} className='me-3 p-0'/>
                </div>
                <div className='w-85 d-flex justify-content-start text-align-start pt-3'>
                  Empleados
                </div>
              </button>
              <button style={{backgroundColor:'transparent'}} className='d-flex flex-row w-90 li-inicio' >
                <div className='w-35 d-flex' >
                  <img src={Roles} style={{width:65}} className='me-3 p-0'/>
                </div>
                <div className='w-85 d-flex justify-content-start text-align-start pt-3'>
                  Roles
                </div>
              </button>
            {/* </div> */}
            {/* <div className='footer h-25 d-flex justify-content-button text-align-button align-items-button' style={{backgroundColor:'red'}}> */}
              <button onClick={(e)=>cerrarSesion(e)} className='w-100 fw-bold' style={{fontSize:20,backgroundColor:'transparent', height:60}}>Cerrar Sesión</button>
            {/* </div> */}
          </ul>
      </div>
  );
}

export default Sidebar;
