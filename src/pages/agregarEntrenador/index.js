import React, { useState } from 'react';
import NavbarInicio from '../../components/NavbarInicio'
import Sidebar from '../../components/sideBar';
import Navbar from '../../components/Navbar';
import Logo2 from "../../assest/logo2.png";
import Circulo from "../../assest/circulo.png";
import Hembra from "../../assest/hembra.png";
import Masculino from "../../assest/masculino.png";
import TableClientes from '../../components/TableClientes';
import { GoPersonAdd } from "react-icons/go";
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import './styles.css'
import Swal from 'sweetalert2';
import { GrClose } from "react-icons/gr";
import { TfiClose } from "react-icons/tfi";
import { AiOutlineClose } from "react-icons/ai";
/* import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; */

export default function AgregarEntrenador(){
    const [genero,setGenero] = useState('');
    const [plan,setPlan] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const location = useLocation()

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
        transform: hover ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.3s ease',
      };
      return (
        <button
          className="fw-bold mb-3"
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          type='submit'
        >
          {children}
        </button>
      );
    };
    const BotonCaancelar = ({ children }) => {
      const [hover, setHover] = useState(false);
      const handleMouseEnter = () => {
        setHover(true);
      };
      const handleMouseLeave = () => {
        setHover(false);
      };
      const buttonStyle = {
        cursor: 'pointer',
        backgroundColor:'#FF4C00',
        color:'white',
        transform: hover ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.3s ease',
      };
      return (
        <button
          className="fw-bold mb-3"
          style={buttonStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          type='submit'
          onClick={(e)=>handleCancelar(e)}
        >
          {children}
        </button>
      );
    };

    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);

    const handleCheckboxChange = (checkboxNumber) => {
      if (checkboxNumber === 1) {
        setIsChecked1(true);
        setIsChecked2(false);
      } else {
        setIsChecked1(false);
        setIsChecked2(true);
      }
    };

    const [checked1,setChecked1] = useState(false);
    const [checked2,setChecked2] = useState(false);
    const [checked3,setChecked3] = useState(false);
    const [checked4,setChecked4] = useState(false);
    const checkedPlan = (checkBox)=>{
      if(checkBox===1){
        setChecked1(true)
        setChecked2(false)
        setChecked3(false)
        setChecked4(false)
      }else
      if(checkBox===2){
        setChecked1(false)
        setChecked2(true)
        setChecked3(false)
        setChecked4(false)
      }else
      if(checkBox===3){
        setChecked1(false)
        setChecked2(false)
        setChecked3(true)
        setChecked4(false)
      }else{
        setChecked1(false)
        setChecked2(false)
        setChecked3(false)
        setChecked4(true)
      }
    }

    const handleCancelar = (e) =>{
      e.preventDefault();
      Swal.fire({
        title:'¡Atención',
        icon:'warning',
        text:'Si continuas con esta acción, se perderán toda la información que haayas ingresado. ¿Estás segur@?',
        showCancelButton:true,
        cancelButtonColor:'red',
        cancelButtonText:'Cancelar',

        showConfirmButton:true,
        confirmButtonColor:'green',
        confirmButtonText:'Descartar'
      }).then(({isConfirmed})=>{
        if(isConfirmed){
          window.location.reload();
        }
      })
    }

    return(
        <div>
          <div className="position-fixed shadow w-100" style={{ fontSize: 20, left: 0, height: "60px", zIndex: 2, userSelect:'none' , backgroundColor:'black'}}>
            <div className="d-flex flex-row justify-content-between w-100 h-100 px-4 shadow">
            <nav className="navbar p-0 ms-2">
              <h4 className='fw-bold ms-3 mt-3' style={{color:'white'}}>Registrar Empleado</h4>        
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
            <div className='pt-5 w-100 ps-4 d-flex flex-column' >
              <div className='div-nombre mt-5'>
                <h5 
                  className=' me-4 mt-2 fw-bold d-flex justify-content-start text-align-start'
                >Nombre:</h5>
                <TextField id="outlined-basic" className=" w-100" size="small" label='Digitar nombre completo' variant='outlined'></TextField>
              </div>
              <div className='container-fluid mt-2 mb-3 mb-5'>
                <div className='row'>
                  <div className='col col-12 col-lg-4 col-md-12 d-flex flex-column mt-2'>
                    <div className='div-duo pt-1'>
                      <h5
                        className='fw-bold d-flex justify-content-start text-align-start pt-2 me-4'
                      >Cédula:</h5>
                      <TextField id="outlined-basic" type='number' className=" w-100" size="small" label='Digitar cédula sin puntos ni comas' variant='outlined'></TextField>
                    </div>
                    <div className='div-duo pt-4'>
                      <h5 
                        className='w-100 fw-bold d-flex justify-content-start text-align-start pt-2'
                      >Fecha de Nacimiento:</h5>
                      <input className=' form-control form-control-sm' 
                        style={{height:40,border:'1px solid grey',fontSize:16}}
                        type='date'></input>
                      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker/>
                      </LocalizationProvider> */}
                    </div>
                  </div>
                  <div className='col col-12 col-lg-4 col-md-12 d-flex flex-column justify-content-center text-align-center '>
                    <div className='div-duo pt-2'>
                      <h5 className='fw-bold pt-2 me-4'>Teléfono:</h5>
                      <TextField id="outlined-basic" className=" w-100" size="small" label='Digitar teléfono sin puntos ni comas' variant='outlined'></TextField>
                    </div>  
                    <div className='div-duo pt-4 '>
                      <h5 className='fw-bold pt-2 me-4'>Correo:</h5>
                      <TextField id="outlined-basic" className=" w-100" size="small" label='Ejemplo@gmail.com' variant='outlined'></TextField>
                    </div>                
                  </div>
                  <div className='col col-12 col-lg-4 col-md-12 d-flex flex-column justify-content-center text-align-center columna-sexo ' >
                    <h4 className='w-100 d-flex justify-content-center text-align-center fw-bold mb-0 pb-0'>Sexo</h4>
                    <div className='w-100 d-flex flex-row'>
                      <div className='d-flex w-50 flex-column justify-content-end text-align-end align-items-end'>
                        <img className='me-5' src={Hembra} style={{width:60, cursor:'pointer'}} onClick={() => (handleCheckboxChange(1),setGenero('Femenino'))}/>
                        
                        <label className='ps-3 pe-3 me-5 ms-1 m-1' style={{backgroundColor:'black', color:'white', borderRadius:12, cursor:'pointer'}}>
                          <input type='radio' placeholder='Mujer' style={{cursor:'pointer'}} checked={isChecked1} onChange={() => (handleCheckboxChange(1),setGenero('Femenino'))}/>
                          Mujer
                        </label>
                      </div>
                      <div className='d-flex w-50 flex-column justify-content-start text-align-start align-items-start'>
                        <img className='ms-5' src={Masculino} style={{width:60, cursor:'pointer'}} onClick={()=>(handleCheckboxChange(2),setGenero('Masculino'))}/>
                        <label className='ps-3 pe-3 ms-5 m-1' style={{backgroundColor:'black', color:'white', borderRadius:12, cursor:'pointer'}}>
                          <input type='radio' placeholder='Mujer' style={{cursor:'pointer'}} checked={isChecked2} onChange={()=>(handleCheckboxChange(2),setGenero('Masculino'))}/>
                          Hombre
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className='row-tipo'>
                  <div className="column-1">
                    <div className="div-duo mb-2 mt-1">
                      <h4 className='h4-tipo fw-bold me-5'>Jornada laboral: </h4>
                      <div className='row-2'>
                        <div className='col col-12 col-lg-3 col-md-3 w-100 pt-1' /* style={{backgroundColor:'green'}} */>
                          <label className='fw-bold w-50' style={{cursor:'pointer'}}>
                            <input className='me-1' type='radio' style={{cursor:'pointer'}} checked={checked1} onChange={()=>(checkedPlan(1),setPlan('Plan 1'))}/>
                            6 a.m - 1 p.m
                          </label>
                          <label className='fw-bold w-50' style={{cursor:'pointer'}}>
                            <input className='me-1' type='radio' style={{cursor:'pointer'}} checked={checked2} onChange={()=>(checkedPlan(2),setPlan('Plan 2'))}/>
                            1 p.m - 10 p.m
                          </label>
                          {/* <label className='fw-bold w-25' style={{cursor:'pointer'}}>
                            <input type='radio' style={{cursor:'pointer'}} checked={checked3} onChange={()=>(checkedPlan(3),setPlan('Plan 3'))}/>
                          
                          </label>
                          <label className='fw-bold w-25' style={{cursor:'pointer'}}>
                            <input type='radio' style={{cursor:'pointer'}} checked={checked4} onChange={()=>(checkedPlan(4),setPlan('Plan 4'))}/>
                            Plan 4
                          </label> */}
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 pb-2 mt-3">
                      <h4 className='fw-bold'>¿Qué especialidad de entrenamiento tiene?</h4>
                      <TextField id="outlined-basic" className=" w-100 " size="small" label='Ej: Gimnasia, levantamiento de pesas' variant='outlined'></TextField>
                    </div>
                    {/* <div className="mb-2 pb-1">
                      <h4 className='fw-bold'>En caso de emergia ¿Qué medicamentos necesita?</h4>
                      <TextField id="outlined-basic" className=" w-100 " size="small" label='Ej: Ibuprofeno, Loratadina' variant='outlined'></TextField>
                    </div> */}
                  </div>
                  {/* <div className="column-2 h-100">
                    <div className=" mb-2 border border-2 h-100" style={{padding:'20px',borderRadius:'20px'}}>
                      <h5 className='fw-bold'>Descripción del plan:</h5>
                      <br/>
                      <br/>
                      <br/>
                      <label className='fw-bold d-flex w-100 justify-content-center text-align-center'>* Aquí se describe el plan *</label>
                      <br/>
                      <br/>
                      <br/>
                    </div>
                  </div> */}
                </div>
              </div>

              <div className='container mt-3'>
                <div className='row'>
                  <div className='col col-12 col-lg-8 col-md-12'>
                    <h5 className='fw-bold'>Observaciones médicas y/o físicas</h5>
                    <TextField
                      id="outlined-multiline-static"
                      label="Por favor describir las condiciones detalladamente"
                      multiline
                      rows={3}
                      defaultValue=""
                      className='w-100'
                    /> 
                  </div>
                  <div className='col col-12 col-lg-4 col-md-12 d-flex flex-column mt-2'>
                    <BotonColorCambiante className='fw-bold' style={{backgroundColor:'black',color:'white'}}>Registrar<GoPersonAdd className='ms-1 fw-bold'/></BotonColorCambiante>
                    <BotonCaancelar className='fw-bold' style={{backgroundColor:'black',color:'white'}}>Cancelar<AiOutlineClose   style={{color:'white'}} className='ms-1 fw-bold'/></BotonCaancelar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}