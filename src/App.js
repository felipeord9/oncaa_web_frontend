import './App.css';
import { BrowserRouter as Router, Routes,Route,Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from './context/authContext';
import Login from '../src/pages/Login/login'
import Navbar from './components/Navbar';
import RecoveryPassword from './pages/RecoveryPassword';
import SendRecovery from './pages/SendRecoveryPassword'
import Page404 from './pages/Page404'
import ChangePassword from './pages/ChangePassword'
import React, { Component } from "react";
import PrivateRoute from '../src/components/PrivateRoute';
import AcercaNostros from './pages/acercaNosotros';
import Contactanos from './pages/contactanos';
import Horarios from './pages/horarios';
import Planes from './pages/planes';
import Clientes from './pages/Clientes';
import Prueba from './pages/prueba'
import AgregarClientes from './pages/agregarCliente';
import Entrenadores from './pages/Entrenadores';
import AgregarEntrenador from './pages/agregarEntrenador';
import EditarClientes from './pages/editarCliente';
import EditarEntrenador from './pages/editarEmpleado';
import Roles from './pages/roles';

function App() {
  return(
    <AuthContextProvider>
    <Router>
      {/* <Navbar/> */}

      <Routes>
        {/* Sesion Pública */}
        <Route path='/' element={<AcercaNostros/>}/>
        <Route path='/contactanos' element={<Contactanos/>}/>
        <Route path='/horarios' element={<Horarios/>}/>
        <Route path='/planes' element={<Planes/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/send/recovery' element={<SendRecovery/>}/>
        <Route path='/recuperacion/contrasena//:token' element={<RecoveryPassword/>} />

        <Route path='/change/password' element={<PrivateRoute component={ChangePassword}/>}/>
        
        {/* Sesion admin */}
        {/* add and edit Sesion Clientes (admin y recepcionista) */}
        <Route path='/clientes' element={<PrivateRoute component={Clientes}/>}/>
        <Route path='/registrar/cliente' element={<PrivateRoute component={AgregarClientes}/>}/>
        <Route path='/editar/cliente' element={<PrivateRoute component={EditarClientes}/>}/>

        {/* add and edit empleados */}
        <Route path='/empleados' element={<PrivateRoute component={Entrenadores}/>}/>
        <Route path='/registrar/empleado' element={<PrivateRoute component={AgregarEntrenador}/>}/>
        <Route path='/editar/empleado' element={<PrivateRoute component={EditarEntrenador}/>}/>

        {/* sesion usuarios - roles */}
        <Route path='/usuarios/roles' element={<PrivateRoute component={Roles}/>}/>

        <Route path='/prueba' element={<Prueba/>}/>
      </Routes>
    </Router>
  </AuthContextProvider>
);
}

export default App;
