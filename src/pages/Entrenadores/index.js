import React, { useState , useEffect } from 'react';
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
import TextField from '@mui/material/TextField';
import { findUsers } from '../../services/userService';
import { findEmpleados } from '../../services/empleadoService';

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
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState()
    const [empleados, setEmpleados] = useState()
    const [loading,setLoading] = useState();

    useEffect(()=>{
      getAllEmpleados()
    },[])

    const getAllEmpleados = () => {
      setLoading(true)
      findEmpleados()
        .then(({ data }) => {
            setEmpleados(data)
            setSuggestions(data)
            setLoading(false)
        })
        .catch((error) => {
          setLoading(false)
        });
    }

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
          onClick={(e)=>navigate('/registrar/empleado')}
        >
          {children}
        </button>
      );
    };

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 1060); // Establecer a true si la ventana es menor o igual a 768px
      };

      // Llama a handleResize al cargar y al cambiar el tamaño de la ventana
      window.addEventListener('resize', handleResize);
      handleResize(); // Llama a handleResize inicialmente para establecer el estado correcto

      // Elimina el event listener cuando el componente se desmonta
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const searchEmpleado = (e) => {
      const { value } = e.target
      if(value !== "") {
        const filteredEmpleado = suggestions.filter((elem) => {
          if(
            elem.rowId.toLocaleString().includes(value) ||
            elem.nombre.toLowerCase().includes(value.toLowerCase())
          ) {
            return elem
          }
        })
        if(filteredEmpleado.length > 0) {
          setSuggestions(filteredEmpleado)
        } else {
          setSuggestions(suggestions)
       }
      } else {
        setSuggestions(suggestions)
      }
      setSearch(value)
    }

    return(
        <div>
          <div className="position-fixed shadow w-100" style={{ fontSize: 20, left: 0, height: "60px", zIndex: 2, userSelect:'none' , backgroundColor:'black'}}>
            <div className="d-flex flex-row justify-content-between w-100 h-100 px-4 shadow">
            {!isMobile && 
              <nav className="navbar p-0 ms-2">
                <h4 className='h4-titulo fw-bold ms-3 mt-3' style={{color:'white'}}>Empleados</h4>
              </nav>
            }
            {/* <nav className="navbar p-0 ms-2">
              <h4 className='fw-bold ms-4 mt-3' style={{color:'white'}}>Empleados</h4>        
            </nav> */}
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
                  <div className='col col-12 col-lg-6 col-md-12 d-flex mt-4'>
                    {!isMobile && <h2 
                      className='fw-bold d-flex justify-content-start text-align-start mt-1'
                    >Buscar:</h2>}
                    <TextField id="outlined-basic" 
                      className="d-flex w-100 mt-2 " size="small" 
                      label='Buscar por nombre ó cédula' variant='outlined'
                      type='search'
                      value={search}
                      onChange={searchEmpleado}
                      ></TextField>
                    {/* <div className='input_group m-5 mb-0 d-flex w-100'>
                      <input type='text' id='busqueda' className='input_group_input w-100 ' required onChange={(e)=> setBusqueda(e.target.value)}/>
                      <label for="busqueda" className='input_group_label '>Buscar por nombre ó cedula</label>
                    </div> */}
                  </div>
                  <div className='col col-12 col-lg-6 col-md-12 d-flex justify-content-center text-align-center mt-4 '>
                    <div className='div-huella pt-1'>
                      <div className='d-flex flex-row justify-content-center text-align-center'>
                        <img className='me-5' src={Circulo} style={{width:55, height:40}}/>
                        <h2 className='fw-bold'>Huella</h2>
                      </div>
                      <h6 className=' ms-5'>Pídele al Cliente queponga su dedo en el lector de huella</h6>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className='container' style={{width:500}}>
                {JSON.stringify(suggestions)}
              </div> */}
              <TableEntrenadores entrenadores={suggestions} loading={loading}/>
              <div className='d-flex w-100 justify-content-center text-align-center mt-4'>
                <BotonColorCambiante className='fw-bold' style={{backgroundColor:'black',color:'white'}}>Registrar Empleado<IoMdAddCircleOutline   className='ms-1 fw-bold'/></BotonColorCambiante>
              </div>
            </div>
          </div>
        </div>
    )
}