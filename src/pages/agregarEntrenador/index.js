import React, { useState, useEffect , useContext } from 'react';
import NavbarInicio from '../../components/NavbarInicio'
import Sidebar from '../../components/sideBar';
import Navbar from '../../components/Navbar';
import Logo2 from "../../assest/logo2.png";
import Informacion from "../../assest/informacion.png";
import Circulo from "../../assest/circulo.png";
import Hembra from "../../assest/hembra.png";
import Masculino from "../../assest/masculino.png";
import TableClientes from '../../components/TableClientes';
import { GoPersonAdd } from "react-icons/go";
import { useLocation , useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import './styles.css'
import Swal from 'sweetalert2';
import { GrClose } from "react-icons/gr";
import { TfiClose } from "react-icons/tfi";
import { AiOutlineClose } from "react-icons/ai";
import Select from 'react-select';
import { createUser, findUserByEmail } from '../../services/userService';
import AuthContext from '../../context/authContext';

const options = [
  { value: '8am', label: '8 a.m' },
  { value: '9am', label: '9 a.m' },
  { value: '10am', label: '10 a.m' },
  { value: '11am', label: '11 a.m' },
  { value: '12m', label: '12 m' },
  { value: '1pm', label: '1 p.m' },
  { value: '2pm', label: '2 p.m' },
  { value: '3pm', label: '3 p.m' },
  { value: '4pm', label: '4 p.m' },
  { value: '5pm', label: '5 p.m' },
  { value: '6pm', label: '6 p.m' },
  { value: '7pm', label: '7 p.m' },
  { value: '8pm', label: '8 p.m' },
  { value: '9pm', label: '9 p.m' },
  { value: '10pm', label: '10 p.m' },
];

export default function AgregarEntrenador(){
    const [genero,setGenero] = useState('');
    const [cargo,setCargo] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const location = useLocation()
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate()
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
          onSubmit={handleSubmit}
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
          className="fw-bold mb-3 "
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
          /* window.location.reload(); */
          navigate('/empleados')
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

    /* const [lunesDesde, setLunesDesde] = useState('');
    const handleChange = (selectedOption) => {
      setSelectedOption(selectedOption);
    }; */

    const [selected, setSelected] = useState({
      lunesDesde:null,
      lunesHasta:null,
      martesDesde:null,
      martesHasta:null,
      miercolesDesde:null,
      miercolesHasta:null,
      juevesDesde:null,
      juevesHasta:null,
      viernesDesde:null,
      viernesHasta:null,
      sabadaoDesde:null,
      sabadoHasta:null,
    })

    const [info, setInfo] = useState({
      nombre:'',
      cedula:'',
      telefono:'',
      correo:'',
      especialidad:'',
    })

    const handlerChangeInfo = (e) => {
      const { id, value } = e.target;
      console.log(value);
      setInfo({
        ...info,
        [id]: value,
      });
    }; 

    const handleSelected = (id, selectedOption) => {
      setSelected({
        ...selected,
        [id]: selectedOption
      });
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if(genero !=='' && cargo!==''){
        if(info.correo!=='' && info.correo.includes('@') && info.correo.split('@')[1].includes('.')){
          /* if(info.cedula.length < 5 && info.cedula.length > 11){ */
            findUserByEmail(info.correo)
            .then(()=>{
              Swal.fire({
                icon:'question',
                title:'¿Estás segur@?',
                text:`Se llevará a cabo el registro de: '${info.nombre}' con rol de: '${cargo}'`,
                showConfirmButton:true,
                confirmButtonColor:'green',
                confirmButtonText:'Registrar',
      
                showCancelButton:true,
                cancelButtonColor:'red',
                cancelButtonText:'Cancelar'
              }).then(({isConfirmed})=>{
                if(isConfirmed){
                  const body = {
                    rowId:info.cedula,
                    nombre:info.nombre,
                    genero:genero,
                    especialidad:info.especialidad,
                    telefono:info.telefono,
                    estado:'ACTIVO',
                    createdAt:new Date(),
                    
                    email:info.correo,
                    password:info.cedula,
                    role:cargo,
                    state:'ACTIVO',
      
                    lunesDesde: selected.lunesDesde===null ? null : selected.lunesDesde.value ,
                    lunesHasta: selected.lunesHasta===null ? null : selected.lunesHasta.value,
                    MartesDesde: selected.martesDesde===null ? null : selected.martesDesde.value,
                    MartesHasta: selected.martesHasta===null ? null : selected.martesHasta.value,
                    MiercolesDesde: selected.miercolesDesde===null ? null : selected.miercolesDesde.value,
                    MiercolesHasta: selected.miercolesHasta===null ? null : selected.miercolesHasta.value,
                    juevesDesde: selected.juevesDesde===null ? null : selected.juevesDesde.value,
                    juevesHasta: selected.juevesHasta===null ? null : selected.juevesHasta.value,
                    viernesDesde: selected.viernesDesde===null ? null : selected.viernesDesde.value,
                    viernesHasta: selected.viernesHasta===null ? null : selected.viernesHasta.value,
                    sabadoDesde: selected.sabadaoDesde===null ? null : selected.sabadaoDesde.value,
                    sabadoHasta: selected.sabadoHasta===null ? null : selected.sabadoHasta.value,
                  }
                  createUser(body)
                  .then(({data})=>{
                    Swal.fire({
                      /* icon:'success', */
                      title:'¡Felicidades!',
                      text:'El empleado se ha registrado de manera exitosamente',
                      confirmButtonColor:'green'
                    })
                    .then(()=>{
                      /* window.location.reload() */
                      navigate('/empleados')
                    })
                  })
                  .catch(()=>{
                    Swal.fire({
                      icon:'warning',
                      title:'Uops!',
                      text:'Ocurrió un error al momento de registrar el empleado, intentalo de nuevo. Si el problema persiste comunícate con los pogramadores para darte una solución oprtuna y rápida.',
                      showConfirmButton:true,
                      showCancelButton:false,
                      confirmButtonColor:'green',
      
                    })
                  })
                }
              })
            })
            .catch(()=>{
              Swal.fire({
                title:'¡Atención!',
                text:'Este correo ya pertenece a un empleado. Verifícalo. Si el problema persiste comunicate con los programadores.',
                showConfirmButton:true,
                confirmButtonColor:'green'
              })
            })
/*           }else{
            Swal.fire({
              title:'¡Atención!',
              text:'Número de identificación inválido. Verifícalo. Si el problema persiste comunicate con los porgramadores.',
              showConfirmButton:true,
              confirmButtonColor:'green'
            })
          } */
        }else{
          Swal.fire({
            title:'¡Atención!',
            text:'Correo inválido para el registro. Verifícalo. Si el problema persiste comunicate con los programadores.',
            showConfirmButton:true,
            confirmButtonColor:'green'
          })
        }
    }else{
      Swal.fire({
        title:'¡Atención!',
        text:'Para llevar a cabo el registro debes de seleccionar un género y un cargo. Elige alguno. Si el problema persiste comunicate con los programadores.',
        showConfirmButton:true,
        confirmButtonColor:'green'
      })
    }
  }

    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        zIndex: 9999,
        marginTop: state.selectProps.menuPlacement === 'top' ? 'unset' : '8px', // Evita el desplazamiento hacia arriba del menú
        marginBottom: state.selectProps.menuPlacement === 'top' ? '8px' : 'unset', // Agrega espacio en la parte inferior cuando el menú se despliega hacia arriba
      }),
      menuPortal: base => ({ ...base, zIndex: 9999 }), 
      clearIndicator: (provided) => ({
        ...provided,
        padding: 0,
        margin:0, // Ajusta el espacio alrededor del icono de limpieza
      }),
    
    };

    return(
        <div>
          <div className="position-fixed shadow w-100" style={{ fontSize: 20, left: 0, height: "60px", zIndex: 2, userSelect:'none' , backgroundColor:'black'}}>
            <div className="d-flex flex-row justify-content-between w-100 h-100 px-4 shadow">
            {!isMobile && 
              <nav className="navbar p-0 ms-2">
                <h4 className='h4-titulo fw-bold ms-3 mt-3' style={{color:'white'}}>Registrar Empleado</h4>
              </nav>
            }
            {/* <nav className="navbar p-0 ms-2">
              {!isMobile && <h4 className='h4-titulo fw-bold ms-3 mt-3' style={{color:'white'}}>Registrar Empleado</h4>}
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
            <div className='pt-5 w-100 pading-primero d-flex flex-column' >
              <div className='div-nombre mt-4'>
                <h5 
                  className=' me-3 mt-2 fw-bold d-flex justify-content-start text-align-start'
                >Nombre:</h5>
                <TextField 
                  id="nombre" className=" w-100" 
                  value={info.nombre}
                  onChange={handlerChangeInfo}
                  size="small" label='Digitar nombre completo' 
                  variant='outlined'
                  required
                ></TextField>
              </div>
              <div className='container-fluid mt-2 mb-3 mb-3'>
                <div className='row'>
                  <div className='col col-12 col-lg-4 col-md-12 d-flex flex-column mt-2'>
                    <div className='div-duo pt-1'>
                      <h5
                        className='fw-bold d-flex justify-content-start text-align-start pt-2 me-4'
                      >Cédula:</h5>
                      <TextField id="cedula" 
                        value={info.cedula}
                        required
                        onChange={handlerChangeInfo}
                        type='number' className=" w-100" 
                        size="small" label='Digitar cédula sin puntos ni comas' 
                        variant='outlined'
                      ></TextField>
                    </div>
                    <div className='div-duo pt-4 '>
                      <h5 className='fw-bold pt-2 me-4'>Correo:</h5>
                      <TextField 
                        id="correo" 
                        value={info.correo}
                        required
                        onChange={handlerChangeInfo}
                        className=" w-100" size="small" 
                        label='Ejemplo@gmail.com' variant='outlined'
                      ></TextField>
                    </div> 
                    {/* <div className='div-duo pt-4'>
                      <h5 
                        className='w-100 fw-bold d-flex justify-content-start text-align-start pt-2'
                      >Fecha de Nacimiento:</h5>
                      <input className=' form-control form-control-sm' 
                        style={{height:40,border:'1px solid grey',fontSize:16}}
                        type='date'></input>
                    </div> */}
                  </div>
                  <div className='col col-12 col-lg-4 col-md-12 d-flex flex-column justify-content-center text-align-center '>
                    <div className='div-duo pt-2 h-100'>
                      <h5 className='fw-bold pt-2 me-4'>Teléfono:</h5>
                      <TextField 
                        id="telefono" 
                        value={info.telefono}
                        onChange={handlerChangeInfo}
                        required
                        className=" w-100" size="small" 
                        label='Digitar teléfono sin puntos ni comas' 
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
                          <input type='radio' placeholder='Mujer' style={{cursor:'pointer'}} checked={isChecked1} onChange={() => (handleCheckboxChange(1),setGenero('Femenino'))}/>
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

              <div className="container">
                <div className='row-tipo me-0 pe-0'>
                  <div className="column-1 pe-0 me-0">
                    {/* <div className="div-duo mb-2 mt-1">
                      <h4 className='h4-tipo fw-bold me-5'>Jornada laboral: </h4>
                      <div className='row-2'>
                        <div className='col col-12 col-lg-3 col-md-3 w-100 pt-1'>
                          <label className='fw-bold w-50' style={{cursor:'pointer'}}>
                            <input className='me-1' type='radio' style={{cursor:'pointer'}} checked={checked1} onChange={()=>(checkedPlan(1),setPlan('Plan 1'))}/>
                            6 a.m - 1 p.m
                          </label>
                          <label className='fw-bold w-50' style={{cursor:'pointer'}}>
                            <input className='me-1' type='radio' style={{cursor:'pointer'}} checked={checked2} onChange={()=>(checkedPlan(2),setPlan('Plan 2'))}/>
                            1 p.m - 10 p.m
                          </label>
                        </div>
                      </div>
                    </div> */}
                    <div className="mb-1 mt-3">
                      <div className="div-duo mt-1">
                        <h4 className='h4-tipo fw-bold'>Cargo: </h4>
                        <div className='row-2'>
                          <div className='col col-12 col-lg-3 col-md-3 w-100 pt-1'>
                            <label className='fw-bold' style={{cursor:'pointer', width:'33%'}}>
                              <input className='me-1 ' type='radio' style={{cursor:'pointer'}} checked={checked1} onChange={()=>(checkedPlan(1),setCargo('coach'))}/>
                              Entrenador@
                            </label>
                            <label className='fw-bold ' style={{cursor:'pointer', width:'33%'}}>
                              <input className='me-1' type='radio' style={{cursor:'pointer'}} checked={checked2} onChange={()=>(checkedPlan(2),setCargo('recepcionista'))}/>
                              Recepcionista
                            </label>
                            <label className='fw-bold ' style={{cursor:'pointer', width:'33%'}}>
                              <input className='me-1' type='radio' style={{cursor:'pointer'}} checked={checked3} onChange={()=>(checkedPlan(3),setCargo('admin'))}/>
                              Administrador
                            </label>
                          </div>
                        </div>
                      </div>
                      {checked1 && 
                      <div className='pt-3'>
                        <h4 className='fw-bold'>¿Qué especialidad de entrenamiento tiene?</h4>
                        <TextField 
                          id="especialidad"
                          value={info.especialidad}
                          onChange={handlerChangeInfo} 
                          className=" w-100 " size="small" 
                          label='Ej: Gimnasia, levantamiento de pesas' 
                          variant='outlined'
                        ></TextField>
                      </div>
                      }
                    </div>
                  </div>
                  <div className='col col-12 col-lg-4 col-md-12 d-flex flex-column mt-2 me-0 pe-0'>
                    <div className='d-flex flex-row nota p-3' style={{backgroundColor:'#EED112', borderRadius:20}}>
                      <img src={Informacion} style={{width:60,height:45}}/>
                      <label className='ms-2'><strong className='fw-bold'>Nota:</strong>Las acciones que pueden realizar los empelados dentro del programa, pueden ser editados en la sección<strong className='ms-1'>Roles.</strong></label>
                    </div>
                  </div>
                </div>
              </div>

              <div className='container mt-0 h-100 mb-3 mt-0 pt-0'>
                <div className='row'>
                  <div className='col col-12 col-lg-8 col-md-12 d-flex flex-column justify-content-center text-align-center'>
                    <h4 className='fw-bold w-100 d-flex text-align-center justify-content-center pt-0 mt-0'>Horario de disponibilidad</h4>
                    <table className='desktop-table'>
                      <tbody>
                        <tr style={{borderBottom:'2px solid black'}}>
                          <td className='p-2 pe-0 pt-0 fw-bold' style={{backgroundColor:'#EED112', color:'black'}}>Lunes</td>
                          <td>
                            <Select
                              id="lunesDesde"
                              value={selected.lunesDesde}
                              onChange={(selectedOption)=>handleSelected('lunesDesde',selectedOption)}
                              options={options}
                              isSearchable
                              placeholder="Desde"
                              menuPortalTarget={document.body}
                              isClearable
                            />
                          </td>
                          <td>
                            <Select
                              id="lunesHasta"
                              value={selected.lunesHasta}
                              onChange={(selectedOption)=>handleSelected('lunesHasta',selectedOption)}
                              options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.lunesDesde))}
                              isSearchable
                              placeholder="Hasta"
                              menuPortalTarget={document.body}
                              required={selected.lunesDesde ? true:false}
                              isDisabled={selected.lunesDesde ? false:true}
                              isClearable

                            />
                          </td>
                        </tr>
                        <tr style={{borderBottom:'2px solid black'}}>
                          <td className='p-2 pe-0 fw-bold' style={{backgroundColor:'#EED112', color:'black'}}>Martes</td>
                          <td>
                            <Select
                              id="martesDesde"
                              value={selected.martesDesde}
                              onChange={(selectedOption)=>handleSelected('martesDesde',selectedOption)}
                              options={options}
                              isSearchable
                              placeholder="Desde"
                              menuPortalTarget={document.body}
                              isClearable
                              styles={customStyles}
                            />
                          </td>
                          <td>
                            <Select
                              id="martesHasta"
                              value={selected.martesHasta}
                              onChange={(selectedOption)=>handleSelected('martesHasta',selectedOption)}
                              options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.martesDesde))}
                              isSearchable
                              placeholder="Hasta"
                              menuPortalTarget={document.body}
                              required={selected.martesDesde ? true:false}
                              isDisabled={selected.martesDesde ? false:true}
                              isClearable
                              styles={customStyles}
                            />
                          </td>
                        </tr>
                        <tr style={{borderBottom:'2px solid black'}}>
                          <td className='p-2 pe-0 fw-bold' style={{backgroundColor:'#EED112', color:'black'}}>Miércoles</td>
                          <td>
                            <Select
                              id="miercolesDesde"
                              value={selected.miercolesDesde}
                              onChange={(selectedOption)=>handleSelected('miercolesDesde',selectedOption)}
                              options={options}
                              styles={customStyles}
                              isSearchable
                              placeholder="Desde"
                              menuPlacement="top"
                              menuPortalTarget={document.body}
                              isClearable

                            />
                          </td>
                          <td>
                            <Select
                              id="miercolesHasta"
                              value={selected.miercolesHasta}
                              onChange={(selectedOption)=>handleSelected('miercolesHasta',selectedOption)}
                              options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.miercolesDesde))}
                              isSearchable
                              placeholder="Hasta"
                              styles={customStyles}
                              menuPlacement="top"
                              menuPortalTarget={document.body}
                              required={selected.miercolesDesde ? true:false}
                              isDisabled={selected.miercolesDesde ? false:true}
                              isClearable

                            />
                          </td>
                        </tr>
                        <tr style={{borderBottom:'2px solid black'}}>
                          <td className='p-2 pe-0 fw-bold' style={{backgroundColor:'#EED112', color:'black'}}>Jueves</td>
                          <td>
                            <Select
                              id="juevesDesde"
                              value={selected.juevesDesde}
                              onChange={(selectedOption)=>handleSelected('juevesDesde',selectedOption)}
                              options={options}
                              isSearchable
                              placeholder="Desde"
                              styles={customStyles}
                              menuPlacement="top"
                              menuPortalTarget={document.body}
                              isClearable

                            />
                          </td>
                          <td >
                            <Select
                              id="juevesHasta"
                              value={selected.juevesHasta}
                              onChange={(selectedOption)=>handleSelected('juevesHasta',selectedOption)}
                              options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.juevesDesde))}
                              isSearchable
                              placeholder="Hasta"
                              styles={{...customStyles}}
                              menuPlacement="top"
                              menuPortalTarget={document.body}
                              required={selected.juevesDesde ? true:false}
                              isDisabled={selected.juevesDesde ? false:true}
                              isClearable

                            />
                          </td>
                        </tr>
                        <tr style={{borderBottom:'2px solid black'}}>
                          <td className='p-2 pe-0 fw-bold' style={{backgroundColor:'#EED112', color:'black'}}>Viernes</td>
                          <td>
                            <Select
                              id="viernesDesde"
                              value={selected.viernesDesde}
                              onChange={(selectedOption)=>handleSelected('viernesDesde',selectedOption)}
                              options={options}
                              isSearchable
                              placeholder="Desde"
                              styles={customStyles}
                              menuPlacement="top"
                              isClearable

                            />
                          </td>
                          <td>
                            <Select
                              id="viernesHasta"
                              value={selected.viernesHasta}
                              onChange={(selectedOption)=>handleSelected('viernesHasta',selectedOption)}
                              options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.viernesDesde))}
                              isSearchable
                              placeholder="Hasta"
                              styles={customStyles}
                              menuPlacement="top"
                              required={selected.viernesDesde ? true:false}
                              isDisabled={selected.viernesDesde ? false:true}
                              isClearable

                            />
                          </td>
                        </tr>
                        <tr style={{borderBottom:'2px solid black'}}>
                          <td className='p-2 pe-0 fw-bold' style={{backgroundColor:'#EED112', color:'black'}}>Sábado</td>
                          <td>
                            <Select
                              id="sabadaoDesde"
                              value={selected.sabadaoDesde}
                              onChange={(selectedOption)=>handleSelected('sabadaoDesde',selectedOption)}
                              options={options}
                              isSearchable
                              placeholder="Desde"
                              styles={customStyles}
                              menuPlacement="top"
                              isClearable
                            />
                          </td>
                          <td>
                            <Select
                              id="sabadoHasta"
                              value={selected.sabadoHasta}
                              onChange={(selectedOption)=>handleSelected('sabadoHasta',selectedOption)}
                              options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.sabadaoDesde))}
                              isSearchable
                              placeholder="Hasta"
                              styles={customStyles}
                              menuPlacement="top"
                              required={selected.sabadaoDesde ? true:false}
                              isDisabled={selected.sabadaoDesde ? false:true}
                              isClearable
                              menuPosition='absolute'
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className='mobile-table'>
                        <h3 className='fw-bold'>Lunes</h3>
                        <div className='d-flex flex-row w-100'>
                          <Select
                            id='lunesDesde'
                            className='w-50'
                            isClearable
                            value={options.find(option=>option.value===selected.lunesDesde)}
                            onChange={(selectedOption)=>handleSelected('lunesDesde',selectedOption)}
                            options={options}
                            placeholder="Desde"
                          />
                          <Select
                            id='lunesHasta'
                            isClearable
                            className='w-50'
                            value={options.find(option=>option.value===selected.lunesHasta)}
                            onChange={(selectedOption)=>handleSelected('lunesHasta',selectedOption)}
                            options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.lunesDesde))}
                            placeholder="Hasta"
                            isDisabled={selected.lunesDesde ? false:true}
                          />
                        </div>
                        <h3 className='mt-1 fw-bold'>Martes</h3>
                        <div className='d-flex flex-row w-100'>
                          <Select
                            id='martesDesde'
                            className='w-50'
                            isClearable
                            value={options.find(option=>option.value===selected.martesDesde)}
                            onChange={(selectedOption)=>handleSelected('martesDesde',selectedOption)}
                            options={options}
                            placeholder="Desde"
                          />
                          <Select
                            id='martesHasta'
                            isClearable
                            className='w-50'
                            value={options.find(option=>option.value===selected.martesHasta)}
                            onChange={(selectedOption)=>handleSelected('martesHasta',selectedOption)}
                            options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.martesDesde))}
                            placeholder="Hasta"
                            isDisabled={selected.martesDesde ? false:true}

                          />
                        </div>
                        <h3 className='mt-1 fw-bold'>Miercoles</h3>
                        <div className='d-flex flex-row w-100'>
                          <Select
                            id='miercolesDesde'
                            className='w-50'
                            isClearable
                            value={options.find(option=>option.value===selected.miercolesDesde)}
                            onChange={(selectedOption)=>handleSelected('miercolesDesde',selectedOption)}
                            options={options}
                            placeholder="Desde"
                          />
                          <Select
                            id='miercolesHasta'
                            isClearable
                            className='w-50'
                            value={options.find(option=>option.value===selected.miercolesHasta)}
                            onChange={(selectedOption)=>handleSelected('miercolesHasta',selectedOption)}
                            options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.miercolesDesde))}
                            placeholder="Hasta"
                            isDisabled={selected.miercolesDesde ? false:true}

                          />
                        </div>
                        <h3 className='mt-1 fw-bold'>Jueves</h3>
                        <div className='d-flex flex-row w-100'>
                          <Select
                            id='juevesDesde'
                            className='w-50'
                            isClearable
                            value={options.find(option=>option.value===selected.juevesDesde)}
                            onChange={(selectedOption)=>handleSelected('juevesDesde',selectedOption)}
                            options={options}
                            placeholder="Desde"
                          />
                          <Select
                            id='juevesHasta'
                            isClearable
                            className='w-50'
                            value={options.find(option=>option.value===selected.juevesHasta)}
                            onChange={(selectedOption)=>handleSelected('juevesHasta',selectedOption)}
                            options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.juevesDesde))}
                            placeholder="Hasta"
                            isDisabled={selected.juevesDesde ? false:true}

                          />
                        </div>
                        <h3 className='mt-1 fw-bold'>Viernes</h3>
                        <div className='d-flex flex-row w-100'>
                          <Select
                            id='viernesDesde'
                            className='w-50'
                            isClearable
                            value={options.find(option=>option.value===selected.viernesDesde)}
                            onChange={(selectedOption)=>handleSelected('viernesDesde',selectedOption)}
                            options={options}
                            placeholder="Desde"
                          />
                          <Select
                            id='viernesHasta'
                            isClearable
                            className='w-50'
                            value={options.find(option=>option.value===selected.viernesHasta)}
                            onChange={(selectedOption)=>handleSelected('viernesHasta',selectedOption)}
                            options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.viernesDesde))}
                            placeholder="Hasta"
                            isDisabled={selected.viernesDesde ? false:true}

                          />
                        </div>
                        <h3 className='mt-1 fw-bold'>Sábado</h3>
                        <div className='d-flex flex-row w-100'>
                          <Select
                            id='sabadaoDesde'
                            className='w-50'
                            isClearable
                            value={options.find(option=>option.value===selected.sabadaoDesde)}
                            onChange={(selectedOption)=>handleSelected('sabadaoDesde',selectedOption)}
                            options={options}
                            placeholder="Desde"
                          />
                          <Select
                            id='sabadoHasta'
                            isClearable
                            className='w-50'
                            value={options.find(option=>option.value===selected.sabadoHasta)}
                            onChange={(selectedOption)=>handleSelected('sabadoHasta',selectedOption)}
                            options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.sabadaoDesde))}
                            placeholder="Hasta"
                            isDisabled={selected.sabadaoDesde ? false:true}

                          />
                        </div>
                    </div>
                  </div>
                  <div className='col col-12 col-lg-4 col-md-12 d-flex flex-column justify-content-center mt-4' style={{ alignSelf:'flex-end'}}>
                    <BotonColorCambiante className='fw-bold' style={{backgroundColor:'black',color:'white'}}>Registrar<GoPersonAdd className='ms-1 fw-bold'/></BotonColorCambiante>
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