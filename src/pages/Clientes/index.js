import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarInicio from '../../components/NavbarInicio'
import Sidebar from '../../components/sideBar';
import Navbar from '../../components/Navbar';
import Logo2 from "../../assest/logo2.png";
import Circulo from "../../assest/circulo.png";
import TableClientes from '../../components/TableClientes';
import { GoPersonAdd } from "react-icons/go";
import { useLocation } from 'react-router-dom';

const data = [
  { rowId: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { rowId: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { rowId: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' },
  { rowId: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { rowId: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { rowId: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' },
  { rowId: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { rowId: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { rowId: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' },
  { rowId: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { rowId: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { rowId: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' },
  { rowId: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { rowId: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { rowId: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' },
  { rowId: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { rowId: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { rowId: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com' }
];

export default function Clientes(){
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
          onClick={(e)=>navigate('/registrar/cliente')}
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
              <h4 className='fw-bold ms-4 mt-3' style={{color:'white'}}>Clientes</h4>        
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
              <TableClientes clientes={data}/>
              <div className='d-flex w-100 justify-content-center text-align-center mt-5'>
                <BotonColorCambiante className='fw-bold' style={{backgroundColor:'black',color:'white'}}>Nuevo Cliente<GoPersonAdd className='ms-1 fw-bold'/></BotonColorCambiante>
              </div>
            </div>
          </div>
        </div>
    )
}