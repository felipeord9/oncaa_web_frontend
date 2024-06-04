import React, { useState , useEffect , Component } from 'react';
import NavbarInicio from '../../components/NavbarInicio'
import Sidebar from '../../components/sideBar';
import Navbar from '../../components/Navbar';
import Logo2 from "../../assest/logo2.png";
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
import { FingerprintSdk } from '../../fingerprint_reader/api/sdk_mod';
import { createCliente , updateCliente , fileSend, findByCedula } from '../../services/clienteService'
import { updateSuscripcion } from '../../services/suscripcionService';
/* import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; */

class Huella extends Component {
  state = {}

  componentDidMount() {
    const Fingerprint = new FingerprintSdk()
    this.setState({ Fingerprint },
      () => {
        this.state.Fingerprint.getDeviceList()
        .then(devices => this.setState({ deviceId: devices[0] }), error => console.log(error))
      }
    )
  }

  clearImage() {
    let vDiv = document.getElementById('imagediv')
    vDiv.innerHTML = ""
    localStorage.setItem("imageSrc", "")
  } 

  startCapturing = () => {
    /* this.state.Fingerprint.startCapture() */
    this.setState(
      ()  => {
        this.state.Fingerprint.startCapture()
        Swal.fire({
          title:'Lector de huella',
          text:'Coloca el dedo en el lector para poder leerlo y presiona Actualizar.',
          showCancelButton:false,
          showConfirmButton:true,
          confirmButtonText:'Actualizar',
          confirmButtonColor:'green'
        }).then(({isConfirmed})=>{
          if(isConfirmed){
            if(document.getElementById('imagediv') ? document.getElementById('imagediv').innerHTML!=='' : localStorage.getItem('imageSrc') ){
              this.state.Fingerprint.stopCapture()

              /* Logica de b64 y blob */
              const client = localStorage.getItem('id');
              const storedBase64Image = localStorage.getItem('imageSrc');
              const byteCharacters = atob(storedBase64Image.split(',')[1]);
              const byteArrays = [];
              for (let i = 0; i < byteCharacters.length; i++) {
                byteArrays.push(byteCharacters.charCodeAt(i));
              }
              const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/png' });
              const formData = new FormData();
              formData.append('base64Image', localStorage.getItem('imageSrc'));
              formData.append('blobImage', blob);
              if((storedBase64Image !== '' || storedBase64Image !== null) && (client.id!==null || client.id!=='')){
                fileSend(localStorage.getItem('id'), formData)
                .then(()=>{
                  localStorage.removeItem('imageSrc')
                  this.setState({ status: 'success' })     
                  Swal.fire({
                    title:'¡CORRECTO!',
                    text:'Se ha actualizado la huella',
                    showCancelButton:false,
                    showConfirmButton:false,
                    timer:5000
                  })
                })
                .catch(()=>{
                  localStorage.removeItem('imageSrc')
                  Swal.fire({
                    icon:'warning',
                    title:'¡Uops!',
                    text:'Ha ocurrido un error al momento de actualizar la huella. Verifica que el lector este bien conectado y vuelve a intentarlo.',
                    showCancelButton:false,
                    showConfirmButton:false,
                    timer:5000
                  })
                })
              }else{
                this.state.Fingerprint.stopCapture()
                this.setState({ status: 'error' })
                localStorage.removeItem('imageSrc')
                Swal.fire({
                  icon:'warning',
                  title:'¡ERROR',
                  text:'Hubo un error al momento de leer la huella. Vuelve a intentarlo. si el problema persiste comunicate con los programadores para darte una oportuna y rápida solucion.',
                  showCancelButton:false,
                  showConfirmButton:false,
                  timer:5000
                })
              }
            }else{
              this.state.Fingerprint.stopCapture()
              this.setState({ status: 'error' })
              localStorage.removeItem('imageSrc')
              Swal.fire({
                icon:'warning',
                title:'¡ERROR',
                text:'Hubo un error al momento de leer la huella. Vuelve a intentarlo. si el problema persiste comunicate con los programadores para darte una oportuna y rápida solucion.',
                showCancelButton:false,
                showConfirmButton:false,
                timer:5000
              })
            }
          }
        })
      }
    )
  }

  stopCapturing = () => {
    this.state.Fingerprint.stopCapture()
  }

  getInfo = () => {
    this.state.Fingerprint.getDeviceList()
    .then(devices => this.setState({ deviceId: devices[0] }), error => console.log(error))
    
    console.log(this.state.Fingerprint)
  }

  onImageDownload = () => {
    if(localStorage.getItem("imageSrc") === "" || localStorage.getItem("imageSrc") === null || document.getElementById('imagediv').innerHTML === ""  ){
      alert("No image to download");
    }else{
      //alert(localStorage.getItem("imageSrc"));
      this.state.Fingerprint.stopCapture()
      downloadURI(localStorage.getItem("imageSrc"), "huella.png", "image/png");
    }
  }

  render() {
    const { deviceId } = this.state

    const connected = deviceId !== "" ? `Conectado a ${deviceId}` : "No hay lectores de huella conectados"

    return (
      <div className="huella Prueba">
        <label className="switch me-2">
          <div className="button-huella">
            <span
              className="icon"
              style={{cursor:'pointer'}}
              onClick={this.startCapturing}
            >
            <svg
              xmlSpace="preserve"
              className={this.state.status}
              viewBox="0 0 463 463"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              id="Capa_1"
              version="1.1"
              fill="#435543"
            >
              <g strokeWidth={0} id="SVGRepo_bgCarrier" />
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                id="SVGRepo_tracerCarrier"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
              <g>
                {" "}
              <path d="M259.476,280.364V247.5c0-12.958-10.542-23.5-23.5-23.5s-23.5,10.542-23.5,23.5v29.672 c0,35.757-13.173,70.087-37.094,96.665l-32.981,36.646c-2.771,3.079-2.521,7.821,0.558,10.593c3.078,2.771,7.82,2.521,10.592-0.558 l32.981-36.646c26.403-29.338,40.944-67.231,40.944-106.7V247.5c0-4.687,3.813-8.5,8.5-8.5s8.5,3.813,8.5,8.5v32.864 c0,44.003-16.301,86.167-45.901,118.727l-32.149,35.364c-2.786,3.064-2.56,7.809,0.505,10.595c1.437,1.307,3.242,1.95,5.042,1.95 c2.04,0,4.072-0.827,5.552-2.455l32.148-35.364C241.789,373.854,259.476,328.106,259.476,280.364z" />{" "}
              <path d="M291.476,247.5c0-30.603-24.897-55.5-55.5-55.5s-55.5,24.897-55.5,55.5v29.672c0,27.839-10.256,54.566-28.879,75.258 l-23.447,26.053c-2.771,3.079-2.521,7.821,0.558,10.593c3.079,2.771,7.82,2.519,10.592-0.558l23.447-26.053 c21.106-23.451,32.73-53.742,32.73-85.293V247.5c0-22.332,18.168-40.5,40.5-40.5c22.332,0,40.5,18.168,40.5,40.5v32.864 c0,51.979-19.256,101.789-54.223,140.252l-27.125,29.839c-2.787,3.064-2.561,7.809,0.504,10.595c1.437,1.307,3.242,1.95,5.042,1.95 c2.04,0,4.072-0.827,5.552-2.455l27.126-29.839c37.481-41.23,58.123-94.622,58.123-150.342V247.5z" />{" "}
              <path d="M323.476,247.5c0-48.248-39.252-87.5-87.5-87.5s-87.5,39.252-87.5,87.5v29.672c0,19.92-7.339,39.045-20.665,53.851 l-21.112,23.458c-2.771,3.079-2.521,7.821,0.558,10.593c3.078,2.771,7.821,2.519,10.592-0.558l21.112-23.458 c15.809-17.565,24.515-40.254,24.515-63.886V247.5c0-39.977,32.523-72.5,72.5-72.5s72.5,32.523,72.5,72.5v32.864 c0,59.958-22.212,117.412-62.545,161.777l-7.507,8.258c-2.786,3.065-2.56,7.809,0.505,10.595c1.437,1.306,3.243,1.95,5.042,1.95 c2.04,0,4.072-0.827,5.552-2.455l7.506-8.258c42.848-47.133,66.446-108.169,66.446-171.867V247.5z" />{" "}
              <path d="M116.476,247.5c0,4.143,3.358,7.5,7.5,7.5s7.5-3.357,7.5-7.5c0-25.255,9.169-49.651,25.819-68.695 c16.495-18.867,39.134-31.205,63.746-34.741c4.1-0.589,6.946-4.391,6.357-8.49c-0.589-4.1-4.394-6.942-8.49-6.357 c-28.16,4.046-54.052,18.15-72.906,39.716C126.962,190.71,116.476,218.613,116.476,247.5z" />{" "}
              <path d="M131.476,277.172c0-4.143-3.358-7.5-7.5-7.5s-7.5,3.357-7.5,7.5c0,12.002-4.421,23.523-12.449,32.443l-18.779,20.867 c-2.771,3.078-2.521,7.82,0.558,10.592c1.434,1.29,3.227,1.925,5.015,1.925c2.052,0,4.097-0.838,5.577-2.483l18.779-20.866 C125.687,307.971,131.476,292.886,131.476,277.172z" />{" "}
              <path d="M340.755,344.123c-4.009-1.044-8.105,1.351-9.155,5.357c-2.769,10.579-6.213,21.096-10.24,31.258 c-1.526,3.851,0.359,8.21,4.21,9.735c0.907,0.359,1.841,0.529,2.761,0.529c2.985,0,5.808-1.795,6.975-4.739 c4.249-10.725,7.884-21.822,10.806-32.986C347.16,349.271,344.761,345.172,340.755,344.123z" />{" "}
              <path d="M315.791,158.632c-3.081-2.771-7.823-2.517-10.592,0.563s-2.517,7.822,0.563,10.591 c22.061,19.832,34.713,48.157,34.713,77.714v32.864c0,12.473-0.86,25.042-2.557,37.359c-0.565,4.104,2.303,7.888,6.406,8.453 c0.347,0.048,0.692,0.071,1.033,0.071c3.688,0,6.903-2.722,7.42-6.478c1.79-12.993,2.698-26.251,2.698-39.406V247.5 C355.476,213.695,341.011,181.304,315.791,158.632z" />{" "}
              <path d="M280.729,153.076c1.041,0.496,2.138,0.73,3.219,0.73c2.803,0,5.492-1.579,6.777-4.278c1.781-3.739,0.192-8.215-3.547-9.995 c-10.806-5.145-22.291-8.616-34.136-10.317c-4.106-0.585-7.901,2.258-8.49,6.357s2.257,7.901,6.357,8.49 C261.257,145.55,271.289,148.582,280.729,153.076z" />{" "}
              <path d="M235.976,96c-2.806,0-5.644,0.078-8.437,0.232c-4.136,0.228-7.304,3.766-7.076,7.901c0.229,4.136,3.763,7.321,7.902,7.075 c2.519-0.139,5.079-0.209,7.61-0.209c75.266,0,136.5,61.233,136.5,136.5v32.864c0,4.143,3.358,7.5,7.5,7.5s7.5-3.357,7.5-7.5V247.5 C387.476,163.963,319.513,96,235.976,96z" />{" "}
              <path d="M153.972,136.693c1.477,0,2.97-0.436,4.275-1.343c12.478-8.677,26.182-15.155,40.733-19.258 c3.987-1.124,6.308-5.268,5.184-9.254s-5.269-6.304-9.254-5.184c-16.16,4.556-31.376,11.749-45.226,21.379 c-3.401,2.365-4.241,7.039-1.876,10.439C149.265,135.57,151.599,136.693,153.972,136.693z" />{" "}
              <path d="M99.476,277.172V247.5c0-34.89,13.213-68.118,37.205-93.565c2.841-3.014,2.702-7.76-0.312-10.602 s-7.761-2.701-10.602,0.312C99.14,171.886,84.476,208.77,84.476,247.5v29.672c0,4.083-1.504,8.002-4.234,11.035l-9.248,10.275 c-2.771,3.079-2.521,7.821,0.558,10.592c1.433,1.291,3.227,1.926,5.015,1.926c2.052,0,4.096-0.837,5.577-2.482l9.248-10.275 C96.605,292.449,99.476,284.966,99.476,277.172z" />{" "}
              <path d="M409.951,189.104c-8.226-24.446-21.299-46.531-38.856-65.642c-2.803-3.05-7.547-3.252-10.597-0.449 c-3.05,2.803-3.251,7.547-0.449,10.598c16.127,17.554,28.134,37.834,35.686,60.276c1.054,3.133,3.976,5.11,7.107,5.11 c0.793,0,1.6-0.127,2.393-0.394C409.16,197.282,411.272,193.029,409.951,189.104z" />{" "}
              <path d="M295.247,73.822c-3.917-1.341-8.183,0.748-9.524,4.668c-1.341,3.919,0.749,8.183,4.668,9.523 c16.538,5.659,32.065,13.857,46.15,24.369c1.347,1.005,2.92,1.489,4.48,1.489c2.286,0,4.544-1.041,6.017-3.015 c2.478-3.319,1.794-8.019-1.525-10.496C330.176,88.916,313.264,79.986,295.247,73.822z" />{" "}
              <path d="M119.442,125.908C150.991,95.659,192.377,79,235.976,79c8.096,0,16.237,0.583,24.196,1.731 c4.103,0.598,7.903-2.252,8.495-6.352c0.592-4.1-2.251-7.902-6.351-8.494C253.648,64.635,244.786,64,235.976,64 c-47.487,0-92.56,18.141-126.915,51.081c-34.248,32.838-54.277,76.905-56.397,124.084c-0.186,4.138,3.018,7.644,7.155,7.829 c0.115,0.006,0.229,0.008,0.343,0.008c3.987,0,7.306-3.14,7.487-7.163C69.594,196.527,87.988,156.066,119.442,125.908z" />{" "}
              <path d="M235.976,32c-16.772,0-33.485,1.944-49.674,5.778c-4.031,0.954-6.524,4.996-5.57,9.026c0.955,4.03,4.997,6.524,9.027,5.569 C204.817,48.809,220.366,47,235.976,47c54.996,0,106.332,21.911,144.55,61.695c1.473,1.533,3.439,2.305,5.41,2.305 c1.869,0,3.741-0.694,5.195-2.091c2.987-2.87,3.083-7.618,0.213-10.604c-19.913-20.729-43.304-37.036-69.522-48.465 C294.666,38.002,265.783,32,235.976,32z" />{" "}
              <path d="M67.507,125.404c1.372,1.074,3.001,1.595,4.619,1.595c2.227,0,4.431-0.987,5.91-2.876 c21.375-27.302,49.515-48.717,81.377-61.932c3.826-1.587,5.642-5.975,4.055-9.801s-5.977-5.644-9.801-4.055 c-34.241,14.201-64.478,37.21-87.441,66.539C63.672,118.137,64.246,122.851,67.507,125.404z" />{" "}
              <path d="M131.983,38.725c1.094,0,2.205-0.24,3.255-0.748C166.816,22.73,200.709,15,235.976,15c18.378,0,36.682,2.162,54.401,6.426 c4.025,0.966,8.077-1.51,9.046-5.537c0.969-4.027-1.51-8.078-5.538-9.047C275.019,2.302,255.535,0,235.976,0 c-37.544,0-73.631,8.232-107.259,24.469c-3.73,1.801-5.294,6.285-3.493,10.015C126.517,37.163,129.195,38.725,131.983,38.725z" />{" "}
              <path d="M321.724,31.383c7.732,3.079,15.385,6.619,22.746,10.52c1.119,0.594,2.321,0.875,3.505,0.875 c2.688,0,5.287-1.449,6.633-3.99c1.939-3.66,0.545-8.199-3.115-10.139c-7.837-4.153-15.986-7.922-24.22-11.201 c-3.849-1.533-8.21,0.345-9.743,4.192C315.998,25.488,317.876,29.851,321.724,31.383z" />{" "}
              </g>{" "}
            </g>
          </svg>
        </span>
      </div>
    </label>
        {/* <button id='clear' onClick={this.clearImage}>Borrar Huella</button>
        <button id='start' onClick={this.startCapturing}>Comenzar Captura</button>
        <button id='stop' onClick={this.stopCapturing}>Detener Captura</button>
        <button id='getInfo' onClick={this.getInfo}>Obtener dispositivos</button>
        <input type="button" className="btn btn-primary" id="saveImagePng" value="Export" onClick={this.onImageDownload} ></input> */}
        {/* <div id="imagediv"></div> */}
        {/* <input type="button" className="btn btn-primary" id="saveImagePng" value="Export" onClick={this.onImageDownload} ></input> */}
      </div>
    )
  }
}

function downloadURI(uri, name, dataURIType) {
  if (IeVersionInfo() > 0) {
    //alert("This is IE " + IeVersionInfo())
    const blob = dataURItoBlob(uri,dataURIType)
    window.navigator.msSaveOrOpenBlob(blob, name)
  } else {
    //alert("This is not IE.");
    let save = document.createElement('a')
    save.href = uri
    save.download = name
    let event = document.createEvent("MouseEvents")
      event.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0
        , false, false, false, false, 0, null
      )
    save.dispatchEvent(event)
  }
}

function dataURItoBlob (dataURI, dataURIType) {
  const binary = atob(dataURI.split(',')[1])
  let array = []
  for(let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  return new Blob([new Uint8Array(array)], {type: dataURIType})
}

function IeVersionInfo() {
  const sAgent = window.navigator.userAgent
  const IEVersion = sAgent.indexOf("MSIE")

  // If IE, return version number.
  if (IEVersion > 0) 
    return parseInt(sAgent.substring(IEVersion+ 5, sAgent.indexOf(".", IEVersion)), 10)

  // If IE 11 then look for Updated user agent string.
  else if (!!navigator.userAgent.match(/Trident\/7\./)) 
    return 11

  // Quick and dirty test for Microsoft Edge
  else if (document.documentMode || /Edge/.test(navigator.userAgent))
    return 12

  else
    return 0 //If not IE return 0
}

export default function EditarClientes(){
    const [genero,setGenero] = useState('');
    const [valor,setValor] = useState('');
    const [tipo,setTipo] = useState('');
    const [fechaInicio, setFechaInicio] = useState(new Date())
    const [fechaFinaliza,setfechaFinaliza] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [busqueda, setBusqueda] = useState('');
    const location = useLocation()
    const navigate = useNavigate();

    const [actulizarMembresia, setActualizarMembresia] = useState('');

    /* varaiables */
    const [info, setInfo] = useState({})
    const [suscripcion,setSuscripcion] = useState({})
    const [compare,setCompare] = useState({})
    useEffect(()=>{
      const datos = JSON.parse(localStorage.getItem('cliente'));
      if(datos){
        setInfo(datos)
        setSuscripcion(datos.suscripcion)
        setCompare(datos)
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
      nuevaFecha.setMonth(nuevaFecha.getMonth()+1);
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

    const handleCancelar = () =>{
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
          setInfo({});
          setSuscripcion({});
          localStorage.removeItem('cliente')
          navigate('/clientes')
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
        text:`Se llevará a cabo la actualización de: '${info.nombre.toUpperCase()}' con tipo de plan: '${actulizarMembresia===''?suscripcion.tipo:actulizarMembresia}'`,
        showConfirmButton:true,
        confirmButtonColor:'green',
        confirmButtonText:'Actualizar',

        showCancelButton:true,
        cancelButtonColor:'red',
        cancelButtonText:'Cancelar'
      }).then(({isConfirmed})=>{
        if(isConfirmed){
          const client = {
            nombre: info.nombre.toUpperCase(),
            rowId: info.rowId,
            correo:info.correo,
            telefono:info.telefono,
            sexo:info.sexo,
            centroSalud:info.centroSalud,
            medicamentos:info.medicamentos,
            observaciones: info.observaciones,
          }
          if(info.rowId > 10000000 && info.rowId < 9999999999){
            if(info.correo!=='' && info.correo.includes('@') && info.correo.split('@')[1].includes('.')){
              if(info.rowId !== compare.rowId){
                findByCedula(info.rowId)
                .then(()=>{
                  Swal.fire({
                    title:'¡Atención!',
                    text:'Este número de identificación ya pertenece a un cliente. Verifícalo. Si el problema persiste comunícate con los programadores.',
                    showConfirmButton:true,
                    confirmButtonColor:'green'
                  })
                })
                .catch(()=>{
                  updateCliente(info.id,client)
                  .then(({data})=>{
                    if(actulizarMembresia!==''){
                      const body={
                        createdAt: new Date(),
                        diasFaltantes:actulizarMembresia==='Cupon 12 entradas' ? 11:null,
                        fechaInicio:fechaInicio,
                        fechaFinaliza:actulizarMembresia==='Cupon 12 entradas' ? null:fechaFinaliza,
                        estado:'ACTIVO',
                        valor:valor,  
                        tipo:actulizarMembresia
                      }
                      updateSuscripcion(suscripcion.id,body)
                      .then(()=>{
                        Swal.fire({
                          /* icon:'success', */
                          title:'¡Felicidades!',
                          text:'Se ha realizado la actualización exitosamente',
                          confirmButtonColor:'green'
                        })
                        .then(()=>{
                          setInfo({});
                          setSuscripcion({});
                          localStorage.removeItem('cliente')
                          navigate('/clientes')
                        })
                      })
                      .catch(({error})=>{
                        Swal.fire({
                          icon:'warning',
                          title:'¡Oups!',
                          text:'Hubo un error al momento de actualizar la suscripción, vuelve a intentarlo y si el problema persiste comunícate con los programadores.',
                          confirmButtonColor:'red'
                        })
                        .then(()=>{
                          setInfo({});
                          setSuscripcion({});
                          localStorage.removeItem('cliente')
                          navigate('/clientes')
                        })
                      })
                    }else{
                      Swal.fire({
                        /* icon:'success', */
                        title:'¡Felicidades!',
                        text:'Se ha realizado la actualización exitosamente',
                        confirmButtonColor:'green'
                      })
                      .then(()=>{
                        setInfo({});
                        setSuscripcion({});
                        localStorage.removeItem('cliente')
                        navigate('/clientes')
                      })
                    }
                  })
                  .catch(()=>{
                    Swal.fire({
                      icon:'warning',
                      title:'Uops!',
                      text:'Ocurrió un error al momento de actulizar la información del cliente, intentalo de nuevo. Si el problema persiste comunícate con los pogramadores para darte una solución oprtuna y rápida.',
                      showConfirmButton:true,
                      showCancelButton:false,
                      confirmButtonColor:'red',
                    })
                    .then(()=>{
                      setInfo({});
                      setSuscripcion({});
                      localStorage.removeItem('cliente')
                      navigate('/clientes')
                    })
                  })
                })
              }else{
                updateCliente(info.id,client)
                .then(({data})=>{
                  if(actulizarMembresia!==''){
                    const body={
                      createdAt: new Date(),
                      diasFaltantes:actulizarMembresia==='Cupon 12 entradas' ? 11:null,
                      fechaInicio:fechaInicio,
                      fechaFinaliza:actulizarMembresia==='Cupon 12 entradas' ? null:fechaFinaliza,
                      estado:'ACTIVO',
                      valor:valor,  
                      tipo:actulizarMembresia
                    }
                    updateSuscripcion(suscripcion.id,body)
                    .then(()=>{
                      Swal.fire({
                        /* icon:'success', */
                        title:'¡Felicidades!',
                        text:'Se ha realizado la actualización exitosamente',
                        confirmButtonColor:'green'
                      })
                      .then(()=>{
                        setInfo({});
                        setSuscripcion({});
                        localStorage.removeItem('cliente')
                        navigate('/clientes')
                      })
                    })
                    .catch(({error})=>{
                      Swal.fire({
                        icon:'warning',
                        title:'¡Oups!',
                        text:'Hubo un error al momento de actualizar la suscripción, vuelve a intentarlo y si el problema persiste comunícate con los programadores.',
                        confirmButtonColor:'red'
                      })
                      .then(()=>{
                        setInfo({});
                        setSuscripcion({});
                        localStorage.removeItem('cliente')
                        navigate('/clientes')
                      })
                    })
                  }else{
                    Swal.fire({
                      /* icon:'success', */
                      title:'¡Felicidades!',
                      text:'Se ha realizado la actualización exitosamente',
                      confirmButtonColor:'green'
                    })
                    .then(()=>{
                      setInfo({});
                      setSuscripcion({});
                      localStorage.removeItem('cliente')
                      navigate('/clientes')
                    })
                  }
                })
                .catch(()=>{
                  Swal.fire({
                    icon:'warning',
                    title:'Uops!',
                    text:'Ocurrió un error al momento de actulizar la información del cliente, intentalo de nuevo. Si el problema persiste comunícate con los pogramadores para darte una solución oprtuna y rápida.',
                    showConfirmButton:true,
                    showCancelButton:false,
                    confirmButtonColor:'red',
                  })
                  .then(()=>{
                    setInfo({});
                    setSuscripcion({});
                    localStorage.removeItem('cliente')
                    navigate('/clientes')
                  })
                })
              }
            }else{
              Swal.fire({
                title:'¡Atención!',
                text:'Correo electrónico inválido. Verifícalo. Si el problema persiste comunícate con los programadores.',
                showConfirmButton:true,
                confirmButtonColor:'green'
              })
            }
          }else{
            Swal.fire({
              title:'¡Atención!',
              text:'Número de identificación inválido. Verifícalo. Si el problema persiste comunícate con los programadores.',
              showConfirmButton:true,
              confirmButtonColor:'green'
            })
          }
        }
      })
    }

    const handleNombre = (e) => {
      const valorInput = e.target.value;
      const soloLetras = /^[a-zA-ZñÑ\s]*$/;
  
      if (soloLetras.test(valorInput) && valorInput.length <= 30) {
        setInfo({
          ...info,
          nombre: valorInput.toUpperCase()
        })
      }
    };

    return(
        <div>
          <div className="position-fixed shadow w-100" style={{ fontSize: 20, left: 0, height: "60px", zIndex: 2, userSelect:'none' , backgroundColor:'black'}}>
            <div className="d-flex flex-row justify-content-between w-100 h-100 px-4 shadow">
            {!isMobile && 
              <nav className="navbar p-0 ms-2">
                <h4 className='h4-titulo fw-bold ms-3 mt-3' style={{color:'white'}}>Actualizar Cliente</h4>
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
          <form className='w-100' onSubmit={(e)=>handleSubmit(e)}>
            <div className='pt-5 w-100 ps-4 d-flex flex-column' >
                <div className='container-fluid mt-4 mb-1'>
                <div className='row'>
                  <div className='col col-12 col-lg-8 col-md-12 d-flex flex-column mt-2'>
                    <div className='div-duo pt-1'>
                      <h5
                        className='fw-bold d-flex justify-content-start text-align-start pt-2 me-2 pe-1'
                      >Nombre:</h5>
                      <TextField id="nombre" 
                      value={(info.nombre)}
                      required
                      onChange={/* handlerChangeInfo */(e)=>handleNombre(e)}
                      type='text' className=" w-100" 
                      size="small"  
                      variant='outlined'
                      autoComplete="off"
                      ></TextField>
                    </div>
                  </div>
                  <div className='huella col col-12 col-lg-4 col-md-12 d-flex flex-row mt-2'>
                    <Huella/>
                    {/* <h2 className='fw-bold '>Huella</h2> */}
                    <h6 className='huella' >Da click y pídele al cliente que ponga su dedo en el lector de huella para actualizar</h6>
                  </div>
                </div>
              </div>
              
              <div className='container-fluid mt-2'>
                <div className='row'>
                  <div className='col col-12 col-lg-4 col-md-12 d-flex flex-column mt-2'>
                    <div className='div-duo pt-1'>
                      <h5
                        className='fw-bold d-flex justify-content-start text-align-start pt-2 me-4'
                      >Cédula:</h5>
                      <TextField 
                        id="rowId" 
                        value={info.rowId}
                        required
                        onChange={handlerChangeInfo}
                        type='number' className=" w-100" 
                        size="small"  
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
                        variant='outlined'

                      ></TextField>
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
                        variant='outlined'
                        ></TextField>
                    </div>  
                    <div className='div-duo pt-4'>
                      {/* <h5 
                        className='w-100 fw-bold d-flex justify-content-start text-align-start pt-2'
                      >Fecha de Nacimiento:</h5>
                      <input className=' form-control form-control-sm' 
                        id='fechaNacimiento'
                        style={{height:40,border:'1px solid grey',fontSize:16}}
                        required
                        value={info.fechaNacimiento}
                        onChange={handlerChangeInfo}
                        type='date'></input> */}
                        <h5 
                          className='fw-bold d-flex justify-content-start text-align-start pt-2 me-4 pe-1'
                        >OncaaId:</h5>
                        <TextField id="oncaaId" 
                        value={info.oncaaId}
                        required
                        type='number'
                        onChange={handlerChangeInfo} 
                        className="d-flex w-100" size="small" 
                        variant='outlined'
                        label='oncaaID'
                        disabled
                      ></TextField>
                      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker/>
                      </LocalizationProvider> */}
                    </div>                
                  </div>
                  <div className='col col-12 col-lg-4 col-md-12 d-flex flex-column justify-content-center text-align-center columna-sexo ' >
                    <h4 className='w-100 d-flex justify-content-center text-align-center fw-bold mb-0 pb-0'>Sexo</h4>
                    <div className='w-100 d-flex flex-row'>
                      <div className='d-flex w-50 flex-column justify-content-center text-align-center align-items-center' >
                        <img className='' src={Hembra} style={{width:60, cursor:'pointer'}} onClick={() => (handleCheckboxChange(1),setGenero('Femenino'))}/>
                        
                        <label className='m-1 ps-3 pe-3 fw-bold' style={{backgroundColor:'black', color:'white', borderRadius:12, cursor:'pointer'}}>
                          <input disabled={info.genero==='Masculino' ? true:false} id='Femenino' value={info.sexo} type='radio' placeholder='Mujer' style={{cursor:'pointer'}} checked={isChecked1} onChange={() => (handleCheckboxChange(1),setGenero('Femenino'))}/>
                          Mujer
                        </label>
                      </div>
                      <div className='d-flex w-50 flex-column justify-content-center text-align-center align-items-center'>
                        <img className='' src={Masculino} style={{width:60, cursor:'pointer'}} onClick={()=>(handleCheckboxChange(2),setGenero('Masculino'))}/>
                        <label className='ps-3 pe-3 m-1 fw-bold' style={{backgroundColor:'black', color:'white', borderRadius:12, cursor:'pointer'}}>
                          <input disabled={info.genero==='Femenino' ? true:false} type='radio' placeholder='Mujer' style={{cursor:'pointer'}} checked={isChecked2} onChange={()=>(handleCheckboxChange(2),setGenero('Masculino'))}/>
                          Hombre
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="container"> */} 
              {/* {new Date(suscripcion.fechaInicio).toLocaleDateString()}
              -----
              {new Date(suscripcion.fechaFinaliza).toLocaleDateString()}
              ------
              {new Date().toLocaleDateString()}
              ------
              {new Date(fechaInicio).toLocaleDateString()}
              ------
              {new Date(fechaFinaliza).toLocaleDateString()} */}
                {(suscripcion.tipo === 'Día') &&
                  <h5 className='p-2 tipo-usuario d-flex flex-row m-2' style={{backgroundColor:'#9A9A9A', borderRadius:5 , color:'white'}}>
                  El usuario cuenta con un plan de tipo: {suscripcion.tipo}, el cual se registró la fecha: {new Date(suscripcion.fechaInicio).toLocaleDateString()}
                  </h5>
                }
                {(suscripcion.tipo === 'Mensualidad') &&
                  <h5 className='p-2 tipo-usuario d-flex flex-row m-2' style={{backgroundColor:'#9A9A9A', borderRadius:5 , color:'whitesmoke'}}>
                  El usuario cuenta con un plan de tipo: {suscripcion.tipo}, el cual va desde el {new Date(suscripcion.fechaInicio).toLocaleDateString()} hasta el {new Date(suscripcion.fechaFinaliza).toLocaleDateString()}
                  </h5>
                }
                {(new Date(suscripcion.fechaFinaliza) < new Date() && (suscripcion.tipo === 'Mensualidad' || suscripcion.tipo === 'Día')) &&
                  <h5 className='p-2 tipo-usuario d-flex flex-row m-2' style={{backgroundColor:'red',color:'white', borderRadius:5 }}>Ya se le venció la suscripción a este usuario</h5>
                }
                {(suscripcion.tipo==='Cupon 12 entradas' /* && Number(suscripcion.diasFaltantes) > 0 */) &&
                  <h5 className='p-2 tipo-usuario d-flex flex-row m-2' style={{backgroundColor:'#9A9A9A', borderRadius:5 , color:'whitesmoke'}}>
                  El usuario cuenta con un plan de tipo: {suscripcion.tipo}, a la cual le quedan: {(suscripcion.diasFaltantes)} Entradas.
                  </h5>
                }
                {(suscripcion.tipo==='Cupon 12 entradas' && Number(suscripcion.diasFaltantes) === 0) &&
                  <h5 className='p-2 tipo-usuario d-flex flex-row m-2' style={{backgroundColor:'red',color:'white', borderRadius:5 }}>Ya se le venció la suscripción a este usuario</h5>
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
                            <input type='radio' style={{cursor:'pointer'}} checked={checked1} onChange={()=>(checkedPlan(1),setValor('12.000'),setActualizarMembresia('Día'),sumarUnDia())}/>
                            Día
                          </label>
                          <label className='fw-bold radio-opcion' style={{cursor:'pointer'}}>
                            <input type='radio' style={{cursor:'pointer'}} checked={checked2} onChange={()=>(checkedPlan(2),setValor('120.000'),setActualizarMembresia('Cupon 12 entradas'),setfechaFinaliza(''))}/>
                            Cupón 12
                          </label>
                          <label className='fw-bold radio-opcion' style={{cursor:'pointer'}}>
                            <input type='radio' style={{cursor:'pointer'}} checked={checked3} onChange={()=>(checkedPlan(3),setValor('145.000'),setActualizarMembresia('Mensualidad'),sumarUnMes())}/>
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
                      variant='outlined'
                      ></TextField>
                    </div>
                    <div className="mb-2 pb-1">
                      <h4 className='fw-bold'>En caso de emergencia ¿Qué medicamentos necesita?</h4>
                      <TextField id="medicamentos" 
                      value={info.medicamentos}
                      onChange={handlerChangeInfo} 
                      className=" w-100 " size="small" 
                      variant='outlined'
                      ></TextField>
                    </div>
                  </div>
                  <div className="column-2 h-100 d-flex justify-content-center text-align-center">
                    <div className=" mb-2 border border-2 h-100 d-flex justify-content-center text-align-center flex-column w-100" style={{padding:'20px',borderRadius:'20px'}}>
                      <h5 className='fw-bold d-flex justify-content-center text-align-center'>Descripción del plan:</h5>
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
                            <label className='ms-1'>Cupón válido para 12 entradas</label>
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

              <div className='container mt-2'>
                <div className='row'>
                  <div className='col col-12 col-lg-8 col-md-12'>
                    <h5 className='fw-bold'>Observaciones médicas y/o físicas</h5>
                    <TextField
                      id="observaciones"
                      value={info.observaciones}
                      onChange={handlerChangeInfo}
                      multiline
                      rows={3}
                      defaultValue=""
                      className='w-100'
                      variant='outlined'
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