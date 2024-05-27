import React, { Component } from 'react';
import { FingerprintSdk } from '../../fingerprint_reader/api/sdk_mod'/* './fingerprint_reader/api/sdk_mod' */
/* import './styles.css' */


class Prueba extends Component {
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
    this.state.Fingerprint.startCapture()
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
    if(localStorage.getItem("imageSrc") === "" || localStorage.getItem("imageSrc") === null || document.getElementById('imagediv').innerHTML === "" ){
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
      <div className="Prueba">
        <h1>Fingerprint reader</h1>
        <h2>{connected}</h2>
        <button id='clear' onClick={this.clearImage}>Borrar Huella</button>
        <button id='start' onClick={this.startCapturing}>Comenzar Captura</button>
        <button id='stop' onClick={this.stopCapturing}>Detener Captura</button>
        <button id='getInfo' onClick={this.getInfo}>Obtener dispositivos</button>
        <input type="button" className="btn btn-primary" id="saveImagePng" value="Export" onClick={this.onImageDownload} ></input>
        <div id="imagediv"></div>
      </div>
    )
  }
}

export default Prueba;

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

/* import React, { useState } from 'react';
import Pb2 from '../../components/biometrico/Pb2';
import axios from 'axios';

export default function FingerPrintReader () {
  const [texto, setTexto] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.get('http://10.3.200.219:83/WCF_HUELLAS_PRUEBAS/Service1.svc', {
        params: {
          texto: texto
        }
      });
      setRespuesta(response.data);  
      console.log(respuesta)
    } catch (error) {
      console.error('Error al llamar al servicio:', error);
      
    }
  };
  return (
    <>
    <h1>Leyendo Huella</h1>
    <script src='/modules/WebSdk/index.js' defer></script>
    <Pb2/>
    
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Introduce el texto"
        />
        <button type="submit">Enviar</button>
      </form>
      {respuesta && <div>Respuesta del servicio: {respuesta}</div>}
    </div>
    </>
  )
}; */




