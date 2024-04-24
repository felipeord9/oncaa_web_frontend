import React, { useState , useEffect } from 'react';
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
import { createCliente } from '../../services/clienteService'
/* import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; */

export default function EditarClientes(){
    const [genero,setGenero] = useState('');
    const [valor,setValor] = useState('');
    const [tipo,setTipo] = useState('');
    const [fechaInicio, setFechaInicio] = useState(new Date())
    const [fechaFinaliza,setfechaFinaliza] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const location = useLocation()

    /* varaiables */
    const [info, setInfo] = useState({})
    const [suscripcion,setSuscripcion] = useState({})

    useEffect(()=>{
      const datos = JSON.parse(localStorage.getItem('cliente'));
      if(datos){
        setInfo(datos)
        setSuscripcion(datos.suscripcion)
      }
      if(datos.sexo==='Femenino'){
        setIsChecked1(true)
      }else if(datos.sexo==='Masculino'){
        setIsChecked2(true)
      }
      /* if(datos.suscripcion.tipo==='Dia'){
        setChecked1(true)
      }else if(datos.suscripcion.tipo==='Cupon 12 entradas'){
        setChecked2(true)
      }else if(datos.suscripcion.tipo==='Mensualidad'){
        setChecked3(true)
      } */
    },[])

    const sumarUnDia = () => {
      const nuevaFecha = new Date(fechaInicio);
      nuevaFecha.setDate(nuevaFecha.getDate()+1);
      setfechaFinaliza(nuevaFecha);
    }

    const sumarUnMes = () => {
      const nuevaFecha = new Date(fechaInicio);
      nuevaFecha.setDate(nuevaFecha.getMonth()+1);
      setfechaFinaliza(new Date(nuevaFecha));
    }

    const handlerChangeInfo = (e) => {
      const { id, value } = e.target;
      console.log(value);
      setInfo({
        ...info,
        [id]: value,
      });
    }; 

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
          onSubmit={(e)=>handleSubmit(e)}
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
      if (checkboxNumber === 1 && info.sexo=='Femenino') {
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

    const handleSubmit = (e) => {
      e.preventDefault();
      Swal.fire({
        icon:'question',
        title:'¿Estás segur@?',
        text:`Se llevará a cabo la actualización de: '${info.nombre}' con tipo de plan: '${tipo}'`,
        showConfirmButton:true,
        confirmButtonColor:'green',
        confirmButtonText:'Registrar',

        showCancelButton:true,
        cancelButtonColor:'red',
        cancelButtonText:'Cancelar'
      }).then(({isConfirmed})=>{
        if(isConfirmed){
          const body = {
            fechaInicio:fechaInicio,
            fechaFinaliza:fechaFinaliza,
            tipo:tipo,
            estado:'ACTIVO',
            valor:valor,
            createdAt:new Date(),
            rowId:info.cedula,
            nombre:info.nombre,
            correo:info.correo,
            telefono:info.telefono,
            fechaNacimiento: info.fechaNacimiento,
            sexo:genero,
            centroSalud:info.centroSalud,
            medicamentos:info.medicamentos,
            observaciones:info.observaciones,
            createBy:'felipe'
          }
          createCliente(body)
          .then(({data})=>{
            Swal.fire({
              /* icon:'success', */
              title:'¡Felicidades!',
              text:'Se ha realizado el registro exitosamente',
              confirmButtonColor:'green'
            })
            .then(()=>{
              window.location.reload()
            })
          })
          .catch(()=>{
            Swal.fire({
              icon:'warning',
              title:'Uops!',
              text:'Ocurrió un error al momento de registrar el cliente, intentalo de nuevo. Si el problema persiste comunícate con los pogramadores para darte una solución oprtuna y rápida.',
              showConfirmButton:true,
              showCancelButton:false,
              confirmButtonColor:'green',

            })
          })
        }
      })
    }

    return(
        <div>
          <div className="position-fixed shadow w-100" style={{ fontSize: 20, left: 0, height: "60px", zIndex: 2, userSelect:'none' , backgroundColor:'black'}}>
            <div className="d-flex flex-row justify-content-between w-100 h-100 px-4 shadow">
            {!isMobile && 
              <nav className="navbar p-0 ms-2">
                <h4 className='h4-titulo fw-bold ms-3 mt-3' style={{color:'white'}}>Registrar Cliente</h4>
              </nav>
            }
            {/* <nav className="navbar p-0 ms-2">
              <h4 className='fw-bold ms-3 mt-3' style={{color:'white'}}>Registrar Cliente</h4>        
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
            <form onSubmit={(e)=>handleSubmit(e)}>
            <div className='pt-5 w-100 ps-4 d-flex flex-column' >
              <div className='div-nombre mt-4'>
                <h5 
                  className=' me-4 mt-2 fw-bold d-flex justify-content-start text-align-start'
                >Nombre:</h5>
                <TextField id="nombre" 
                  value={info.nombre}
                  onChange={handlerChangeInfo}
                  className=" w-100" size="small" 
                  label='Digitar nombre completo'
                  variant='outlined'
                  required
                ></TextField>
              </div>
              <div className='container-fluid mt-2 mb-3 mb-2'>
                <div className='row'>
                  <div className='col col-12 col-lg-4 col-md-12 d-flex flex-column mt-2'>
                    <div className='div-duo pt-1'>
                      <h5
                        className='fw-bold d-flex justify-content-start text-align-start pt-2 me-4'
                      >Cédula:</h5>
                      <TextField id="cedula" 
                      value={info.rowId}
                      required
                      onChange={handlerChangeInfo}
                      type='number' className=" w-100" 
                      size="small" label='Digitar cédula sin puntos ni comas' 
                      variant='outlined'
                      ></TextField>
                    </div>
                    <div className='div-duo pt-4'>
                      <h5 
                        className='w-100 fw-bold d-flex justify-content-start text-align-start pt-2'
                      >Fecha de Nacimiento:</h5>
                      <input className=' form-control form-control-sm' 
                        id='fechaNacimiento'
                        style={{height:40,border:'1px solid grey',fontSize:16}}
                        required
                        value={info.fechaNacimiento}
                        onChange={handlerChangeInfo}
                        type='date'></input>
                      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker/>
                      </LocalizationProvider> */}
                    </div>
                  </div>
                  <div className='col col-12 col-lg-4 col-md-12 d-flex flex-column justify-content-center text-align-center '>
                    <div className='div-duo pt-2'>
                      <h5 className='fw-bold pt-2 me-4'>Teléfono:</h5>
                      <TextField id="telefono" 
                        value={info.telefono}
                        required
                        onChange={handlerChangeInfo} 
                        className=" w-100" size="small" 
                        label='Digitar teléfono sin puntos ni comas' 
                        variant='outlined'
                      ></TextField>
                    </div>  
                    <div className='div-duo pt-4 '>
                      <h5 className='fw-bold pt-2 me-4'>Correo:</h5>
                      <TextField id="correo" 
                        value={info.correo}
                        required
                        onChange={handlerChangeInfo}
                        className=" w-100" size="small" 
                        label='Ejemplo@gmail.com' 
                        variant='outlined'
                      ></TextField>
                    </div>                
                  </div>
                  <div className='col col-12 col-lg-4 col-md-12 d-flex flex-column justify-content-center text-align-center columna-sexo ' >
                    <h4 className='w-100 d-flex justify-content-center text-align-center fw-bold mb-0 pb-0'>Sexo</h4>
                    <div className='w-100 d-flex flex-row'>
                      <div className='d-flex w-50 flex-column justify-content-center text-align-center align-items-center' >
                        <img className='' src={Hembra} style={{width:60, cursor:'pointer'}} onClick={() => (handleCheckboxChange(1),setGenero('Femenino'))}/>
                        
                        <label className='m-1 ps-3 pe-3 fw-bold' style={{backgroundColor:'black', color:'white', borderRadius:12, cursor:'pointer'}}>
                          <input id='Femenino' value={info.sexo} type='radio' placeholder='Mujer' style={{cursor:'pointer'}} checked={isChecked1} onChange={() => (handleCheckboxChange(1),setGenero('Femenino'))}/>
                          Mujer
                        </label>
                      </div>
                      <div className='d-flex w-50 flex-column justify-content-center text-align-center align-items-center'>
                        <img className='' src={Masculino} style={{width:60, cursor:'pointer'}} onClick={()=>(handleCheckboxChange(2),setGenero('Masculino'))}/>
                        <label className='ps-3 pe-3 m-1 fw-bold' style={{backgroundColor:'black', color:'white', borderRadius:12, cursor:'pointer'}}>
                          <input type='radio' placeholder='Mujer' style={{cursor:'pointer'}} checked={isChecked2} onChange={()=>(handleCheckboxChange(2),setGenero('Masculino'))}/>
                          Hombre
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="container"> */} 
                {new Date(suscripcion.fechaFinaliza) >= new Date() &&
                  <h5 className='p-2 tipo-usuario d-flex flex-row' style={{backgroundColor:'#9A9A9A', borderRadius:5 , color:'whitesmoke'}}>
                  El usuario cuenta con un plan de tipo: {suscripcion.tipo} el cual va desde el {new Date(suscripcion.fechaInicio).toLocaleDateString()} hasta el {new Date(suscripcion.fechaFinaliza).toLocaleDateString()}, Si desea renovar la suscripción selecione a continuación el tipo:
                  </h5>
                }
                {new Date(suscripcion.fechaFinaliza).toDateString() > new Date() &&
                  <h5 className='p-2' style={{backgroundColor:'red',color:'white'}}>Ya se le vencio la suscripción a este usuario</h5>
                }
                {suscripcion.tipo==='Cupon 12 entradas'

                }
              {/* </div> */}
              <div className="container">
                <div className='row-tipo'>
                  <div className="column-1">
                    <div className="div-duo mb-2">
                      <h4 className='fw-bold me-5'>Plan: </h4>
                      <div className='row-2'>
                        <div className='col col-12 col-lg-3 col-md-3 w-100 pt-1' /* style={{backgroundColor:'green'}} */>
                          <label className='fw-bold radio-opcion' style={{cursor:'pointer'}}>
                            <input type='radio' style={{cursor:'pointer'}} checked={checked1} onChange={()=>(checkedPlan(1),setValor('12.000'),setTipo('Dia'),sumarUnDia())}/>
                            Día
                          </label>
                          <label className='fw-bold radio-opcion' style={{cursor:'pointer'}}>
                            <input type='radio' style={{cursor:'pointer'}} checked={checked2} onChange={()=>(checkedPlan(2),setValor('120.000'),setTipo('Cupon 12 entradas'),setfechaFinaliza(''))}/>
                            Cupón 12
                          </label>
                          <label className='fw-bold radio-opcion' style={{cursor:'pointer'}}>
                            <input type='radio' style={{cursor:'pointer'}} checked={checked3} onChange={()=>(checkedPlan(3),setValor('145.000'),setTipo('Mensualidad'),sumarUnMes())}/>
                            Mensualidad
                          </label>
                          {/* <label className='fw-bold w-25' style={{cursor:'pointer'}}>
                            <input type='radio' style={{cursor:'pointer'}} checked={checked4} onChange={()=>(checkedPlan(4),setPlan('Plan 4'))}/>
                            Plan 4
                          </label> */}
                        </div>
                      </div>
                    </div>
                    <div className="mb-2 pb-1">
                      <h4 className='fw-bold'>¿Qué Centro de salud requiere ir en caso de un accidente?</h4>
                      <TextField id="centroSalud" 
                      value={info.centroSalud}
                      onChange={handlerChangeInfo}
                      className=" w-100 " size="small" 
                      label='Ej: SOS, Sura, NUevaa EPS' 
                      variant='outlined'></TextField>
                    </div>
                    <div className="mb-2 pb-1">
                      <h4 className='fw-bold'>En caso de emergia ¿Qué medicamentos necesita?</h4>
                      <TextField id="medicamentos" 
                      value={info.medicamentos}
                      onChange={handlerChangeInfo} 
                      className=" w-100 " size="small" 
                      label='Ej: Ibuprofeno, Loratadina' 
                      variant='outlined'></TextField>
                    </div>
                  </div>
                  <div className="column-2 h-100 d-flex justify-content-center text-align-center">
                    <div className=" mb-2 border border-2 h-100 d-flex justify-content-center text-align-center flex-column w-100" style={{padding:'20px',borderRadius:'20px'}}>
                      <h5 className='fw-bold d-flex justify-content-center text-align-center'>Descripción del plan:</h5>
                      <br/>
                      <br/>
                      {checked1 && 
                        <div className='d-flex flex-column justify-content-center text-align-center'>
                          <div className='d-flex flex-row d-flex justify-content-center text-align-center'>
                            <h5 className='fw-bold'>Tipo:</h5>
                            <label className='ms-1'>Día</label>
                          </div>
                          <div className='d-flex flex-row d-flex justify-content-center text-align-center'>
                            <h5 className='fw-bold'>Valor:</h5>
                            <label className='ms-1'>$12.000</label>
                          </div>
                        </div>
                      }
                      {checked2 && 
                        <div className='d-flex flex-column justify-content-center text-align-center'>
                          <div className='d-flex flex-row d-flex justify-content-center text-align-center'>
                            <h5 className='fw-bold'>Tipo:</h5>
                            <label className='ms-1'>Cupón Válido para 12 entradas</label>
                          </div>
                          <div className='d-flex flex-row d-flex justify-content-center text-align-center'>
                            <h5 className='fw-bold'>Valor:</h5>
                            <label className='ms-1'>$120.000</label>
                          </div>
                        </div>
                      }
                      {checked3 && 
                        <div className='d-flex flex-column justify-content-center text-align-center'>
                          <div className='d-flex flex-row d-flex justify-content-center text-align-center'>
                            <h5 className='fw-bold'>Tipo:</h5>
                            <label className='ms-1'>Mensualidad</label>
                          </div>
                          <div className='d-flex flex-row d-flex justify-content-center text-align-center'>
                            <h5 className='fw-bold'>Valor:</h5>
                            <label className='ms-1'>$145.000</label>
                          </div>
                        </div>
                      }
                      {(!checked1 && !checked2 && !checked3) &&
                      <div>
                        <br/>
                        <label className='fw-bold d-flex w-100 justify-content-center text-align-center'>* Aquí se describe el plan *</label>
                        <br/>
                      </div>
                      }
                      <br/>
                      <br/>
                    </div>
                  </div>
                </div>
              </div>

              <div className='container mt-3'>
                <div className='row'>
                  <div className='col col-12 col-lg-8 col-md-12'>
                    <h5 className='fw-bold'>Observaciones médicas y/o físicas</h5>
                    <TextField
                      id="observaciones"
                      value={info.observaciones}
                      onChange={handlerChangeInfo}
                      label="Por favor describir las condiciones detalladamente"
                      multiline
                      rows={3}
                      defaultValue=""
                      className='w-100'
                    /> 
                  </div>
                  <div className='col col-12 col-lg-4 col-md-12 d-flex flex-column mt-2'>
                    <BotonColorCambiante className='fw-bold' style={{backgroundColor:'black',color:'white'}}>Actualizar<GoPersonAdd className='ms-1 fw-bold'/></BotonColorCambiante>
                    <BotonCaancelar className='fw-bold' style={{backgroundColor:'black',color:'white'}}>Cancelar<AiOutlineClose   style={{color:'white'}} className='ms-1 fw-bold'/></BotonCaancelar>
                  </div>
                </div>
              </div>
            </div>
          </form>
          </div>
        </div>
    )
}