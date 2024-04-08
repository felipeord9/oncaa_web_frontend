import * as FiIcons from 'react-icons/fi';
import DataTable from 'react-data-table-component'
import useAlert from '../../hooks/useAlert';
import { FaUserEdit } from "react-icons/fa";
import { useState } from 'react';
import ModalEntrenadores from '../ModalEntrenador';

export default function TableEntrenadores({ entrenadores, loading }) {
  const { successAlert } = useAlert()
  const [selected,setSelected] = useState('');
  const [showModal,setShowModal] = useState('');

  const columns = [
    {
      id: "cedula",
      name: "Cédula",
      selector: (row) => row.rowId,
      sortable: true,
      /* width: '200px', */
      class:'cell-cedula'
    },
    {
      id: "name",
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
      width: '400px'
    },
    {
      id: "oncaId",
      name: "OncaaID",
      selector: (row) => row.oncaaId,
      sortable: true,
      width: '300px'
    },
    {
      id: "state",
      name: "Estado",
      selector: (row) => row.state,
      sortable: true,
      width: '200px'
    },
    {
      id: "options",
      name: "",
      center: true,
      cell: (row, index, column, id) => (
        <div className='d-flex gap-2 p-1'>
          <button title="Editar usuario" className='btn btn-sm'
          style={{color:'white',backgroundColor:'black'}} onClick={(e) => {
            setSelected(row)
            setShowModal(true)
          }}>
            <FaUserEdit />
          </button>
        </div>
      ),
      width: '100px'
    },
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
    <div className='container mt-5 div-table shadow p-0' /* style={{maxHeight:'65vh',maxWidth:'65vw'}} */>
      <ModalEntrenadores 
        entrenador={selected}
        setEntrenador={setSelected}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <DataTable
        className="bg-light text-center border border-2 h-100"
        style={{fontSize:20 , height:450}}
        columns={columns}
        data={entrenadores}
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