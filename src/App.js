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

function App() {
  return(
    <AuthContextProvider>
    <Router>
      <Navbar/>

      <Routes>
        <Route path='/' element={<AcercaNostros/>}/>
        <Route path='/contactanos' element={<Contactanos/>}/>
        <Route path='/horarios' element={<Horarios/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/send/recovery' element={<SendRecovery/>}/>
        <Route path='/recuperacion/contrasena//:token' element={<RecoveryPassword/>} />
        <Route path='/change/password' element={<PrivateRoute component={ChangePassword}/>}/>
        {/* <Route path='*' element={<Page404/>}/> */}

      </Routes>
    </Router>
  </AuthContextProvider>
);
}

export default App;
