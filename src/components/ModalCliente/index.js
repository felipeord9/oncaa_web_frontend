import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2'
import { createUser, updateUser } from "../../services/userService";
import * as Bs from "react-icons/bs";

export default function ModalCliente({
  cliente,
  setCliente,
  showModal,
  setShowModal,
  reloadInfo,
}) {
  const [info, setInfo] = useState({
    rowId: "",
    name: "",
    oncaaId: "",
    email: "",
    /* genero: "", */
  });
  const [error, setError] = useState('')
 
  useEffect(() => {
    if(cliente) {
      setInfo({
        rowId: cliente?.rowId,
        name: cliente?.name,
        oncaaId: cliente?.oncaaId,
        email:cliente?.email,
        /* role: cliente?.role, */
      })
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
    <Modal show={showModal} style={{ fontSize: 18, userSelect:'none' }} centered>
      <Modal.Header>
        <center>
        <Modal.Title className="fw-bold" style={{fontSize:40}}>
          <strong>Actualizar cliente</strong>
        </Modal.Title>
        </center>
      </Modal.Header>
      <Modal.Body className="p-2">
        <div className="m-2 h-100">
          <form onSubmit={handleUpdateCliente}>
            <div>
              <div>
              <div>
                <label className="fw-bold">Cédula</label>
                <input
                  id="rowId"
                  type="number"
                  value={info.rowId}
                  className="form-control form-control-sm"
                  maxLength={10}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label className="fw-bold">Nombre</label>
                <input
                  id="name"
                  type="text"
                  value={info.name}
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>
              {/* <div>
                <label className="fw-bold">Oncaa ID</label>
                <input
                  id="email"
                  type="number"
                  value={info.oncaaId}
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div> */}
              <div>
                <label className="fw-bold">Correo Electrónico</label>
                <input
                  id="email"
                  type="email"
                  value={info.email}
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>
                {/* <label className="fw-bold">Estado</label>
                <select
                  id="role"
                  value={info.email}
                  className="form-select form-select-sm"
                  onChange={handleChange}
                  required
                >
                  <option selected disabled value="">
                    -- Seleccione un estado --
                  </option>
                  <option value="ACTIVO">ACTIVO</option>
                  <option value='INACTIVO'>INACTIVO</option>
                </select> */}
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
            {/* <div className="d-flex justify-content-center gap-2 mt-2 ">
              <BotonColorCambiante>Actualizar</BotonColorCambiante>
              <BotonCaancelar>
                Cancelar
              </BotonCaancelar>
            </div> */}
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-center gap-2 mt-2 ">
          <BotonColorCambiante>Actualizar</BotonColorCambiante>
          <BotonCaancelar>
            Cancelar
          </BotonCaancelar>
        </div>
      </Modal.Footer>
    </Modal>
    </div>
  );
}
