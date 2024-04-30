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
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import './styles.css'
import Swal from 'sweetalert2';
import { GrClose } from "react-icons/gr";
import { TfiClose } from "react-icons/tfi";
import { AiOutlineClose } from "react-icons/ai";
import Select from 'react-select';
import { updateEmplaedo } from '../../services/empleadoService';
import { updateHorarios } from '../../services/horariosService';
import { createUser } from '../../services/userService';
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

export default function EditarEntrenador(){
    const [genero,setGenero] = useState('');
    const [cargo,setCargo] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const location = useLocation()
    const { user, setUser } = useContext(AuthContext);
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
          setInfo({})
          setSelected({})
          localStorage.removeItem('empleado')
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

    const [selected, setSelected] = useState({})
    const [info, setInfo] = useState({})

    useEffect(()=>{
      const data = JSON.parse(localStorage.getItem('empleado'));
      if(data){
        setSelected(data.horario)
        setInfo(data)
      }
      if(data.genero==='Femenino'){
        setIsChecked1(true)
      }else if(data.genero==='Masculino'){
        setIsChecked2(true)
      }
      if(data.user.role==='admin'){
        setChecked3(true)
      }else if(data.user.role==='coach'){
        setChecked1(true)
      }else if(data.user.role==='admin'){
        setChecked2(true)
      }

      
    },[])

    const handlerChangeInfo = (e) => {
      const { id, value } = e.target;
      console.log(value);
      setInfo({
        ...info,
        [id]: value,
      });
    }; 

    const handleSelected = (id, selectedOption) => {
      /* const option=options.find((item)=>{if(item.value===id)return item})
      if(option){
        setSelected({
          ...selected,
          [id]: option
        });
      }else{ */
        setSelected({
          ...selected,
          [id]: selectedOption
        });
      
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      Swal.fire({
        icon:'question',
        title:'¿Estás segur@?',
        text:`Se llevará a cabo la actualización de: '${info.nombre}' con rol de: '${info?.user?.role}'`,
        showConfirmButton:true,
        confirmButtonColor:'green',
        confirmButtonText:'Actualizar',

        showCancelButton:true,
        cancelButtonColor:'red',
        cancelButtonText:'Cancelar'
      }).then(({isConfirmed})=>{
        if(isConfirmed){
          const body = {
            rowId:info.rowId,
            nombre:info.nombre,
            genero:genero !=='' ? genero:info.genero,
            especialidad:info.especialidad,
            telefono:info.telefono,
          }
          updateEmplaedo(info.id,body)
          .then(({data})=>{
            const horarios={
              lunesDesde: selected.lunesDesde===null ? null : selected.lunesDesde.value ,
              lunesHasta: selected.lunesHasta===null ? null : selected.lunesHasta.value,
              MartesDesde: selected.MartesDesde===null ? null : selected.MartesDesde.value,
              MartesHasta: selected.MartesHasta===null ? null : selected.MartesHasta.value,
              MiercolesDesde: selected.MiercolesDesde===null ? null : selected.MiercolesDesde.value,
              MiercolesHasta: selected.MiercolesHasta===null ? null : selected.MiercolesHasta.value,
              juevesDesde: selected.juevesDesde===null ? null : selected.juevesDesde.value,
              juevesHasta: selected.juevesHasta===null ? null : selected.juevesHasta.value,
              viernesDesde: selected.viernesDesde===null ? null : selected.viernesDesde.value,
              viernesHasta: selected.viernesHasta===null ? null : selected.viernesHasta.value,
              sabadoDesde: selected.sabadoDesde===null ? null : selected.sabadoDesde.value,
              sabadoHasta: selected.sabadoHasta===null ? null : selected.sabadoHasta.value,
            }
            updateHorarios(selected.id,horarios)
            .then(()=>{
              Swal.fire({
                /* icon:'success', */
                title:'¡Felicidades!',
                text:'El empleado se ha actualizado de manera exitosamente',
                confirmButtonColor:'green'
              })
              .then(()=>{
                setInfo({})
                setSelected({})
                localStorage.removeItem('empleado')
                navigate('/empleados')
              })
            })
            .catch(()=>{
              Swal.fire({
                icon:'warning',
                title:'Uops!',
                text:'Ocurrió un error al momento de actualizar el empleado, intentalo de nuevo. Si el problema persiste comunícate con los pogramadores para darte una solución oprtuna y rápida.',
                showConfirmButton:true,
                showCancelButton:false,
                confirmButtonColor:'green',
  
              })
            })
          })
          .catch(()=>{
            Swal.fire({
              icon:'warning',
              title:'Uops!',
              text:'Ocurrió un error al momento de actualizar el empleado, intentalo de nuevo. Si el problema persiste comunícate con los pogramadores para darte una solución oprtuna y rápida.',
              showConfirmButton:true,
              showCancelButton:false,
              confirmButtonColor:'green',

            })
          })
        }
      })
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
      container: provided => ({
        ...provided,
        /* width: '200px', */ // Ajusta el ancho según tus necesidades
        margin: '0', // Ajusta el margen según tus necesidades
        display: 'inline-block' // Evita que los selectores se desplacen hacia abajo
      }),
    
    };

    return(
        <div>
          <div className="position-fixed shadow w-100" style={{ fontSize: 20, left: 0, height: "60px", zIndex: 2, userSelect:'none' , backgroundColor:'black'}}>
            <div className="d-flex flex-row justify-content-between w-100 h-100 px-4 shadow">
            {!isMobile && 
              <nav className="navbar p-0 ms-2">
                <h4 className='h4-titulo fw-bold ms-3 mt-3' style={{color:'white'}}>Actualizar Empleado</h4>
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
                  className=' me-4 mt-2 fw-bold d-flex justify-content-start text-align-start'
                >Nombre:</h5>
                <TextField 
                  id="nombre" 
                  className=" w-100" 
                  value={info.nombre}
                  onChange={handlerChangeInfo}
                  size="small"  
                  variant='outlined'
                ></TextField>
              </div>
              <div className='container-fluid mt-2 mb-3 mb-3'>
                <div className='row'>
                  <div className='col col-12 col-lg-4 col-md-12 d-flex flex-column mt-2'>
                    <div className='div-duo pt-1'>
                      <h5
                        className='fw-bold d-flex justify-content-start text-align-start pt-2 me-4'
                      >Cédula:</h5>
                      <TextField id="rowId" 
                        value={info.rowId}
                        onChange={handlerChangeInfo}
                        type='number' className=" w-100" 
                        size="small"  
                        variant='outlined'
                      ></TextField>
                    </div>
                    <div className='div-duo pt-4 '>
                      <h5 className='fw-bold pt-2 me-4'>Correo:</h5>
                      <TextField 
                        id="correo" 
                        value={info?.user?.email}
                        disabled
                        style={{color:'black'}}
                        onChange={handlerChangeInfo}
                        className=" w-100" size="small" 
                        variant='outlined'
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
                        className=" w-100" size="small" 
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
                              <input disabled={info?.user?.role==='coach' ? false :true} className='me-1 ' type='radio' style={{cursor:'pointer'}} checked={checked1} onChange={()=>(checkedPlan(1),setCargo('coach'))}/>
                              Entrenador@
                            </label>
                            <label className='fw-bold ' style={{cursor:'pointer', width:'33%'}}>
                              <input disabled={info?.user?.role==='recepcionista' ? false :true} className='me-1' type='radio' style={{cursor:'pointer'}} checked={checked2} onChange={()=>(checkedPlan(2),setCargo('recepcionista'))}/>
                              Recepcionista
                            </label>
                            <label className='fw-bold ' style={{cursor:'pointer', width:'33%'}}>
                              <input disabled={info?.user?.role==='admin' ? false :true} className='me-1' type='radio' style={{cursor:'pointer'}} checked={checked3} onChange={()=>(checkedPlan(3),setCargo('admin'))}/>
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
                    <h3 className='fw-bold w-100 d-flex text-align-center justify-content-center pt-0 mt-0'>Horario de disponibilidad</h3>
                    <table className='desktop-table'>
                      <tbody>
                        <tr style={{borderBottom:'2px solid black'}}>
                          <td className='p-2 pe-0 pt-0 fw-bold w-25' style={{backgroundColor:'#EED112', color:'black'}}>Lunes</td>
                          <td style={{width:'50vw'}}>
                            <Select
                              id="lunesDesde"
                              value={options.find(option=>option.value===selected.lunesDesde)}
                              onChange={(selectedOption)=>handleSelected('lunesDesde',selectedOption)}
                              options={options}
                              isSearchable
                              placeholder="Desde"
                              menuPortalTarget={document.body}
                              isClearable
                              styles={customStyles}
                              className='w-100'
                            />
                          </td>
                          <td style={{width:'50vw'}}>
                            <Select
                              id="lunesHasta"
                              value={options.find(option=>option.value===selected.lunesHasta)}
                              onChange={(selectedOption)=>handleSelected('lunesHasta',selectedOption)}
                              options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.lunesDesde))}
                              isSearchable
                              placeholder="Hasta"
                              menuPortalTarget={document.body}
                              required={selected.lunesDesde ? true:false}
                              isDisabled={selected.lunesDesde ? false:true}
                              isClearable
                              styles={customStyles}
                              className='w-100'
                              
                            />
                          </td>
                        </tr>
                        <tr style={{borderBottom:'2px solid black'}}>
                          <td className='p-2 pe-0 fw-bold' style={{backgroundColor:'#EED112', color:'black'}}>Martes</td>
                          <td style={{width:'50vw'}}>
                            <Select
                              id="MartesDesde"
                              value={options.find(option=>option.value===selected.MartesDesde)}
                              onChange={(selectedOption)=>handleSelected('MartesDesde',selectedOption)}
                              options={options}
                              isSearchable
                              placeholder="Desde"
                              menuPortalTarget={document.body}
                              isClearable
                              styles={customStyles}
                              className='w-100'
                            />
                          </td>
                          <td style={{width:'50vw'}}>
                            <Select
                              id="MartesHasta"
                              value={options.find(option=>option.value===selected.MartesHasta)}
                              onChange={(selectedOption)=>handleSelected('MartesHasta',selectedOption)}
                              options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.martesDesde))}
                              isSearchable
                              placeholder="Hasta"
                              menuPortalTarget={document.body}
                              required={selected.MartesDesde ? true:false}
                              isDisabled={selected.MartesDesde ? false:true}
                              isClearable
                              styles={customStyles}
                              className='w-100'
                            />
                          </td>
                        </tr>
                        <tr style={{borderBottom:'2px solid black'}}>
                          <td className='p-2 pe-0 fw-bold' style={{backgroundColor:'#EED112', color:'black'}}>Miércoles</td>
                          <td style={{width:'50vw'}}>
                            <Select
                              id="MiercolesDesde"
                              value={options.find(option=>option.value===selected.MiercolesDesde)}
                              onChange={(selectedOption)=>handleSelected('MiercolesDesde',selectedOption)}
                              options={options}
                              styles={customStyles}
                              isSearchable
                              placeholder="Desde"
                              menuPlacement="top"
                              menuPortalTarget={document.body}
                              isClearable
                              className='w-100'
                            />
                          </td>
                          <td style={{width:'50vw'}}>
                            <Select
                              id="MiercolesHasta"
                              value={options.find(option=>option.value===selected.MiercolesHasta)}
                              onChange={(selectedOption)=>handleSelected('MiercolesHasta',selectedOption)}
                              options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.miercolesDesde))}
                              isSearchable
                              placeholder="Hasta"
                              styles={customStyles}
                              menuPlacement="top"
                              menuPortalTarget={document.body}
                              required={selected.MiercolesDesde ? true:false}
                              isDisabled={selected.MiercolesDesde ? false:true}
                              isClearable
                              className='w-100'
                            />
                          </td>
                        </tr>
                        <tr style={{borderBottom:'2px solid black'}}>
                          <td className='p-2 pe-0 fw-bold' style={{backgroundColor:'#EED112', color:'black'}}>Jueves</td>
                          <td style={{width:'50vw'}}>
                            <Select
                              id="juevesDesde"
                              value={options.find(option=>option.value===selected.juevesDesde)}
                              onChange={(selectedOption)=>handleSelected('juevesDesde',selectedOption)}
                              options={options}
                              isSearchable
                              placeholder="Desde"
                              styles={customStyles}
                              menuPlacement="top"
                              menuPortalTarget={document.body}
                              isClearable
                              className='w-100'
                            />
                          </td>
                          <td style={{width:'50vw'}}>
                            <Select
                              id="juevesHasta"
                              value={options.find(option=>option.value===selected.juevesHasta)}
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
                              className='w-100'
                            />
                          </td>
                        </tr>
                        <tr style={{borderBottom:'2px solid black'}}>
                          <td className='p-2 pe-0 fw-bold' style={{backgroundColor:'#EED112', color:'black'}}>Viernes</td>
                          <td style={{width:'50vw'}}>
                            <Select
                              id="viernesDesde"
                              value={options.find(option=>option.value===selected.viernesDesde)}
                              onChange={(selectedOption)=>handleSelected('viernesDesde',selectedOption)}
                              options={options}
                              isSearchable
                              placeholder="Desde"
                              styles={customStyles}
                              menuPlacement="top"
                              isClearable
                              className='w-100'
                            />
                          </td>
                          <td style={{width:'50vw'}}>
                            <Select
                              id="viernesHasta"
                              value={options.find(option=>option.value===selected.viernesHasta)}
                              onChange={(selectedOption)=>handleSelected('viernesHasta',selectedOption)}
                              options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.viernesDesde))}
                              isSearchable
                              placeholder="Hasta"
                              styles={customStyles}
                              menuPlacement="top"
                              required={selected.viernesDesde ? true:false}
                              isDisabled={selected.viernesDesde ? false:true}
                              isClearable
                              className='w-100'
                            />
                          </td>
                        </tr>
                        <tr style={{borderBottom:'2px solid black'}}>
                          <td className='p-2 pe-0 fw-bold' style={{backgroundColor:'#EED112', color:'black'}}>Sábado</td>
                          <td style={{width:'50vw'}}>
                            <Select
                              id="sabadoDesde"
                              value={options.find(option=>option.value===selected.sabadoDesde)}
                              onChange={(selectedOption)=>handleSelected('sabadoDesde',selectedOption)}
                              options={options}
                              isSearchable
                              placeholder="Desde"
                              styles={customStyles}
                              menuPlacement="top"
                              isClearable
                              className='w-100'
                            />
                          </td>
                          <td style={{width:'50vw'}}>
                            <Select
                              id="sabadoHasta"
                              value={options.find(option=>option.value===selected.sabadoHasta)}
                              onChange={(selectedOption)=>handleSelected('sabadoHasta',selectedOption)}
                              options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.sabadaoDesde))}
                              isSearchable
                              placeholder="Hasta"
                              styles={customStyles}
                              menuPlacement="top"
                              required={selected.sabadoDesde ? true:false}
                              isDisabled={selected.sabadoDesde ? false:true}
                              isClearable
                              menuPosition='absolute'
                              className='w-100'
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
                            id='MartesDesde'
                            className='w-50'
                            isClearable
                            value={options.find(option=>option.value===selected.MartesDesde)}
                            onChange={(selectedOption)=>handleSelected('MartesDesde',selectedOption)}
                            options={options}
                            placeholder="Desde"
                          />
                          <Select
                            id='MartesHasta'
                            isClearable
                            className='w-50'
                            value={options.find(option=>option.value===selected.MartesHasta)}
                            onChange={(selectedOption)=>handleSelected('MartesHasta',selectedOption)}
                            options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.lunesDesde))}
                            placeholder="Hasta"
                            isDisabled={selected.MartesDesde ? false:true}

                          />
                        </div>
                        <h3 className='mt-1 fw-bold'>Miercoles</h3>
                        <div className='d-flex flex-row w-100'>
                          <Select
                            id='MiercolesDesde'
                            className='w-50'
                            isClearable
                            value={options.find(option=>option.value===selected.MiercolesDesde)}
                            onChange={(selectedOption)=>handleSelected('MiercolesDesde',selectedOption)}
                            options={options}
                            placeholder="Desde"
                          />
                          <Select
                            id='MiercolesHasta'
                            isClearable
                            className='w-50'
                            value={options.find(option=>option.value===selected.MiercolesHasta)}
                            onChange={(selectedOption)=>handleSelected('MiercolesHasta',selectedOption)}
                            options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.lunesDesde))}
                            placeholder="Hasta"
                            isDisabled={selected.MiercolesDesde ? false:true}

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
                            options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.lunesDesde))}
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
                            options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.lunesDesde))}
                            placeholder="Hasta"
                            isDisabled={selected.viernesDesde ? false:true}

                          />
                        </div>
                        <h3 className='mt-1 fw-bold'>Sábado</h3>
                        <div className='d-flex flex-row w-100'>
                          <Select
                            id='sabadoDesde'
                            className='w-50'
                            isClearable
                            value={options.find(option=>option.value===selected.sabadoDesde)}
                            onChange={(selectedOption)=>handleSelected('sabadoDesde',selectedOption)}
                            options={options}
                            placeholder="Desde"
                          />
                          <Select
                            id='sabadoHasta'
                            isClearable
                            className='w-50'
                            value={options.find(option=>option.value===selected.sabadoHasta)}
                            onChange={(selectedOption)=>handleSelected('sabadoHasta',selectedOption)}
                            options={options.filter(option=>options.indexOf(option) > options.indexOf(selected.lunesDesde))}
                            placeholder="Hasta"
                            isDisabled={selected.sabadoDesde ? false:true}

                          />
                        </div>
                    </div>
                    {/* {JSON.stringify(selected)} */}
                  </div>
                  <div className='col col-12 col-lg-4 col-md-12 d-flex flex-column justify-content-center mt-4' style={{ alignSelf:'flex-end'}}>
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