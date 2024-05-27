import * as FiIcons from 'react-icons/fi';
import DataTable from 'react-data-table-component'
import useAlert from '../../hooks/useAlert';
import { FaUserEdit } from "react-icons/fa";
import { useState } from 'react';
import ModalEntrenadores from '../ModalEntrenador';
import { useNavigate } from 'react-router-dom';

export default function TableUsuarios({ usuarios, loading , getAllUsers}) {
  const { successAlert } = useAlert()
  const [selected,setSelected] = useState('');
  const [showModal,setShowModal] = useState('');
  const navigate = useNavigate();

  const columns = [
    {
      id: "options",
      name: "",
      center: true,
      cell: (row, index, column, id) => (
        <div className='d-flex gap-2 p-1'>
          <button title="Editar empleado" className='btn btn-sm'
          style={{color:'white',backgroundColor:'black'}} onClick={(e) => {
            setSelected(row.user)
            /* localStorage.setItem('empleado',JSON.stringify(row))
            navigate('/editar/empleado') */
            setShowModal(true)
          }}>
            <FaUserEdit />
          </button>
        </div>
      ),
      width: '60px'
    },
    {
      id: "name",
      name: "Nombre",
      selector: (row) => row?.nombre,
      sortable: true,
      width:'250px'
    },
    {
      id: "email",
      name: "Gmail",
      selector: (row) => row?.user?.email,
      sortable: true,
      width:'250px'
    },
    {
      id: "password",
      name: "Contraseña",
      selector: (row) => '**************',
      sortable: true,
      class: 'cell-name'
    },
    {
      id: "role",
      name: "Cargo",
      selector: (row) => row?.user?.role,
      sortable: true,
      width: '150px'
    },
    {
      id:'state',
      name:'estado',
      selector: (row) => row?.user?.state,
      sortable: true,
      width: '150px'
    }
  ]
  
  const customStyles = {
    cells: {
      style: {
        fontSize: '15px', // ajustar el tamaño de la fuente de las celdas
      },
    },
    rows: {
      style: {
        height:'35px' // ajusta el alto de las filas según tus necesidades
      },
    },
    headCells: {
      style: {
        fontSize: '22px',
        height:'40px',
        opacity:0.9,
        color:'grey'
      },
    },
  };

  return (
    <div className='container div-table shadow p-0' /* style={{maxHeight:'65vh',maxWidth:'65vw'}} */>
      <ModalEntrenadores 
        entrenador={selected}
        setEntrenador={setSelected}
        showModal={showModal}
        setShowModal={setShowModal}
        reloadInfo={getAllUsers}
      />
      <DataTable
        className="bg-light text-center border border-2 h-100"
        style={{fontSize:20 , height:450}}
        columns={columns}
        data={usuarios!==null && usuarios}
        fixedHeaderScrollHeight={200}
        customStyles={customStyles}
        progressPending={loading}
        progressComponent={
          <div class="d-flex align-items-center text-danger gap-2 mt-2">
            <strong>Cargando...</strong>
            <div
              class="spinner-border spinner-border-sm ms-auto"
              role="status"
              aria-hidden="true"
            ></div>
          </div>
        }
        dense
        striped
        fixedHeader
        noDataComponent={
          <div style={{padding: 24}}>Ningún resultado encontrado...</div>}  
      />
    </div>
  )
}