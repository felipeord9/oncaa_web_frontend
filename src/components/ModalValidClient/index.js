import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2'
import { createUser, updateUser } from "../../services/userService";
import * as Bs from "react-icons/bs";
import TextField from '@mui/material/TextField';

export default function ModalValidClient({
  cliente,
  setCliente,
  showModal,
  setShowModal,
  reloadInfo,
}) {
  const [info, setInfo] = useState({
    
  });
  const [suscripcion,setSuscripcion] = useState({})
  const [error, setError] = useState('')
 
  useEffect(() => {
    if(cliente) {
      setInfo(cliente)
      setSuscripcion(cliente.suscripcion)
    }
  }, [cliente])

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInfo({
      ...info,
      [id]: value,
    });
  };

  const handleUpdateCliente = (e) => {
    e.preventDefault();
    Swal.fire({
      title: '¿Está segur@ de querer editar este cliente?',
          showDenyButton: true,
          confirmButtonText: 'Confirmar',
          confirmButtonColor: '#D92121',
          denyButtonText: `Cancelar`,
          denyButtonColor:'blue',
          icon:'question'
    }).then((result)=>{
      if(result.isConfirmed){
        updateUser(cliente.id, info)
          .then((data) => {           
            setShowModal(!showModal)
            reloadInfo();
            Swal.fire({
              title: '¡Correcto!',
              text: 'El cliente se ha actualizado correctamente',
              icon: 'success',
              showConfirmButton: false,
              timer: 2500
            })
          })
      }else if(result.isDenied){
        Swal.fire('Oops', 'La información suministrada se ha descartado', 'info')
        setShowModal(!showModal)
      }
      cleanForm()
    })
      .catch((error) => {
        setError(error.response.data.errors.original.detail)
        setTimeout(() => setError(''), 2500)
      });
  };

  const cleanForm = () => {
    setInfo({
      rowId: "",
      name: "",
      email: "",
      password: "",
      role: "",
    })
  }
  const [shown,setShown]=useState("");
  const switchShown =()=>setShown(!shown);
  
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
      transform: hover ? 'scale(1.08)' : 'scale(1)',
      transition: 'all 0.3s ease',
    };
    return (
      <button
        className="fw-bold mb-3"
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        type='submit'
        onSubmit={(e)=>handleUpdateCliente}
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
      transform: hover ? 'scale(1.08)' : 'scale(1)',
      transition: 'all 0.3s ease',
    };
    return (
      <button
        className="fw-bold ms-2 mb-3"
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        type='submit'
        /* onClick={(e)=>handleCancelar(e)} */
        onClick={(e) => {
          setShowModal(false)
          cleanForm()
          setCliente(null)
        }}
      >
        {children}
      </button>
    );
  };

  const handleCancelar = (e) =>{
    e.preventDefault();
    Swal.fire({
      title:'¡Atención',
      icon:'warning',
      text:'Se continuas con esta acción, se perderán todo lo que hayas realizado. ¿Estás segur@?',
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

  return (
    <div className="wrapper d-flex justify-content-center align-content-center" style={{userSelect:'none'}}>
    <Modal show={showModal} style={{ fontSize: 18, userSelect:'none' }} centered onHide={(e)=>setShowModal(false)}>
      <Modal.Header closeButton>
        <center>
        <Modal.Title className="fw-bold" style={{fontSize:40}}>
          <strong>Info Cliente</strong>
        </Modal.Title>
        </center>
      </Modal.Header>
      <Modal.Body className="p-2">
        <div className="m-2 h-100">
          <form onSubmit={handleUpdateCliente}>
            <div>
              <div>
                {/* {JSON.stringify(info)} */}
              <div>
                <label className="fw-bold">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  value={info.nombre}
                  disabled
                  className="form-control form-control-sm"
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label className="fw-bold">Plan</label>
                <input
                  id="tipo"
                  type="text"
                  value={suscripcion.tipo}
                  className="form-control form-control-sm"
                  autoComplete="off"
                  disabled
                  required
                />
              </div>
              {(suscripcion.tipo === 'Día' || suscripcion.tipo === 'Mensualidad') ?
                <div>
                  <label className="fw-bold">Fecha Finaliza</label>
                  <input
                    id="fechaInicio"
                    type="text"
                    value={new Date(suscripcion.fechaInicio).toLocaleDateString()}
                    disabled
                    style={{color:'black'}}
                    className="form-control form-control-sm w-100"
                    autoComplete="off"
                    required
                    multiline
                    rows={3}
                  />
                </div>:
                <div>
                <label className="fw-bold">Días Faltantes</label>
                <input
                  id="diasFaltantes"
                  type="text"
                  value={suscripcion.diasFaltantes}
                  disabled
                  style={{color:'black'}}
                  className="form-control form-control-sm w-100"
                  autoComplete="off"
                  required
                  multiline
                  rows={3}
                />
              </div>
              } 
              </div>
            </div>
            <div className="d-flex w-100 mt-2">
              <span 
                className="text-center text-danger w-100 m-0"
                style={{height: 15}}
              >
                {error}
              </span>
            </div>
          </form>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <div className="d-flex justify-content-center gap-2 mt-2 ">
          <BotonColorCambiante>Actualizar</BotonColorCambiante>
          <BotonCaancelar>
            Cancelar
          </BotonCaancelar>
        </div>
      </Modal.Footer> */}
    </Modal>
    </div>
  );
}
