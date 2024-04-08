import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarInicio from '../../components/NavbarInicio'
import Sidebar from '../../components/sideBar';
import Navbar from '../../components/Navbar';
import Logo2 from "../../assest/logo2.png";
import TableEntrenadores from '../../components/TableEntrenadores';
import { useLocation } from 'react-router-dom';
import { IoAddCircleOutline } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import Circulo from "../../assest/circulo.png";

const data = [
  { rowId: 1, name: 'John Doe', oncaaId: 30, state: 'ACTIVO' },
  { rowId: 2, name: 'Jane Smith', oncaaId: 25, state: 'ACTIVO' },
  { rowId: 3, name: 'Bob Johnson', oncaaId: 40, state: 'INACTIVO' },
  { rowId: 1, name: 'John Doe', oncaaId: 30, state: 'ACTIVO' },
  { rowId: 2, name: 'Jane Smith', oncaaId: 25, state: 'ACTIVO' },
  { rowId: 3, name: 'Bob Johnson', oncaaId: 40, state: 'INACTIVO' },
  { rowId: 1, name: 'John Doe', oncaaId: 30, state: 'ACTIVO' },
  { rowId: 2, name: 'Jane Smith', oncaaId: 25, state: 'ACTIVO' },
  { rowId: 3, name: 'Bob Johnson', oncaaId: 40, state: 'INACTIVO' },
  { rowId: 1, name: 'John Doe', oncaaId: 30, state: 'ACTIVO' },
  { rowId: 2, name: 'Jane Smith', oncaaId: 25, state: 'ACTIVO' },
  { rowId: 3, name: 'Bob Johnson', oncaaId: 40, state: 'INACTIVO' },
  { rowId: 1, name: 'John Doe', oncaaId: 30, state: 'ACTIVO' },
  { rowId: 2, name: 'Jane Smith', oncaaId: 25, state: 'ACTIVO' },
  { rowId: 3, name: 'Bob Johnson', oncaaId: 40, state: 'INACTIVO' },
  { rowId: 1, name: 'John Doe', oncaaId: 30, state: 'ACTIVO' },
  { rowId: 2, name: 'Jane Smith', oncaaId: 25, state: 'ACTIVO' },
  { rowId: 3, name: 'Bob Johnson', oncaaId: 40, state: 'INACTIVO' }
];

export default function Entrenadores(){
    const [isOpen, setIsOpen] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const location = useLocation()
    const navigate = useNavigate();

    const toggleMenu = () => {
      setIsOpen(!isOpen);
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
          className="fw-bold ms-2 mb-3"
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          type='submit'
          onClick={(e)=>navigate('/registrar/entrenador')}
        >
          {children}
        </button>
      );
    };

    return(
        <div>
          <div className="position-fixed shadow w-100" style={{ fontSize: 20, left: 0, height: "60px", zIndex: 2, userSelect:'none' , backgroundColor:'black'}}>
            <div className="d-flex flex-row justify-content-between w-100 h-100 px-4 shadow">
            <nav className="navbar p-0 ms-2">
              <h4 className='fw-bold ms-4 mt-3' style={{color:'white'}}>Empleados</h4>        
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
          <div className='w-100 d-flex flex-row '>
            <div className='div-sidebar'>
              <Sidebar />
            </div>
            <div className='pt-4 w-100 ps-4 d-flex flex-column' >
              <div className='container-fluid mt-4 mb-3'>
                <div className='row'>
                  <div className='col col-12 col-lg-6 col-md-12 d-flex'>
                    <h2 
                      className='pt-5  fw-bold d-flex justify-content-start text-align-start'
                    >Buscar:</h2>
                    <div className='input_group m-5 mb-0 d-flex w-100'>
                      <input type='text' id='busqueda' className='input_group_input w-100 ' required onChange={(e)=> setBusqueda(e.target.value)}/>
                      <label for="busqueda" className='input_group_label '>Buscar por nombre ó cedula</label>
                    </div>
                  </div>
                  <div className='col col-12 col-lg-6 col-md-12 d-flex justify-content-center text-align-center '>
                    <img className='mt-5 me-5' src={Circulo} style={{width:55, height:40}}/>
                    <h2 className='fw-bold mt-5'>Huella</h2>
                    <h6 className='mt-5 ms-5'>Pídele al Cliente queponga su dedo en el lector de huella</h6>
                  </div>
                </div>
              </div>
              <TableEntrenadores entrenadores={data} />
              <div className='d-flex w-100 justify-content-center text-align-center mt-4'>
                <BotonColorCambiante className='fw-bold' style={{backgroundColor:'black',color:'white'}}>Registrar Empleado<IoMdAddCircleOutline   className='ms-1 fw-bold'/></BotonColorCambiante>
              </div>
            </div>
          </div>
        </div>
    )
}