import * as FiIcons from 'react-icons/fi';
import DataTable from 'react-data-table-component'
import useAlert from '../../hooks/useAlert';
import { FaUserEdit } from "react-icons/fa";
import ModalCliente from '../ModalCliente';
import { useState } from 'react';

export default function TableClientes({ clientes, loading }) {
  const { successAlert } = useAlert()
  const [selected,setSelected] = useState('');
  const [showModal,setShowModal] = useState('');

  const columns = [
    {
      id: "cedula",
      name: "Cédula",
      selector: (row) => row.rowId,
      sortable: true,
      /* width: '250px', */
      class:'cell-cedula'
    },
    {
      id: "name",
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
      /* width: '450px' */
      class:'cell-name'
    },
    {
      id: "email",
      name: "Correo Electrónico",
      selector: (row) => row.email,
      sortable: true,
      width: '400px'
    },
    {
      id: "options",
      name: "",
      center: true,
      cell: (row, index, column, id) => (
        <div className='d-flex gap-2 p-1'>
          <button title="Editar Cliente" className='btn btn-sm '
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
      <ModalCliente 
        cliente={selected}
        setCliente={setSelected}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <DataTable
        className="bg-light text-center border border-2 h-100"
        style={{borderRadius:10}}
        columns={columns}
        data={clientes}
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