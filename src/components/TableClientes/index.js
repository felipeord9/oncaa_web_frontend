import * as FiIcons from 'react-icons/fi';
import DataTable from 'react-data-table-component'
import useAlert from '../../hooks/useAlert';
import { FaUserEdit } from "react-icons/fa";
import ModalCliente from '../ModalCliente';
import { useState , useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import { FaEye } from "react-icons/fa6";
import dayjs from 'dayjs';

export default function TableClientes({ clientes, loading  }) {
  const { successAlert } = useAlert()
  const [selected,setSelected] = useState('');
  const [showModal,setShowModal] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const currentDate = dayjs();

  const conditionalRowStyles = [
    {
      when: row => dayjs(row?.suscripcion?.fechaFinaliza).isBefore(currentDate),
      style: {
        backgroundColor: '#FA8072',
      },
    },
  ];

  const columns = [
    {
      id: "options",
      name: "",
      center: true,
      cell: (row, index, column, id) => (
        <div className='d-flex gap-2 p-1'>
          {user.role==='coach' ? (
            <button title="Editar Cliente" className='btn btn-sm '
            style={{color:'white',backgroundColor:'black'}} onClick={(e) => {
              setSelected(row)
              setShowModal(true)
            }}>
              <FaEye  />
            </button>
          ):(
            <button title="Editar Cliente" className='btn btn-sm '
            style={{color:'white',backgroundColor:'black'}} onClick={(e) => {
              setSelected(row)
              /* setShowModal(true) */
              localStorage.setItem('cliente',JSON.stringify(row))
              navigate('/editar/cliente')
            }}>
              <FaUserEdit />
            </button>
          )}
        </div>
      ),
      width: '60px'
    },
    {
      id: "cedula",
      name: "Cédula",
      selector: (row) => row.rowId,
      sortable: true,
      /* width: '250px', */
      class:'cell-name'
    },
    {
      id: "name",
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
      /* width: '450px' */
      class:'cell-name'
    },
    {
      id: "plan",
      name: "Plan",
      selector: (row) => row?.suscripcion?.tipo,
      sortable: true,
      class:'cell-name'
    },
    {
      id: "email",
      name: "Gmail",
      selector: (row) => row.correo,
      sortable: true,
      class:'cell-name'
    },
    {
      id: "telefono",
      name: "Teléfono",
      selector: (row) => row.telefono,
      sortable: true,
      class:'cell-name'
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
    <div className='div-table container shadow p-0'>
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
        conditionalRowStyles={conditionalRowStyles}
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