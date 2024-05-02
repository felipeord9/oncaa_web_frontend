import React from 'react';
import './styles.css'; // Archivo CSS para estilos
import Entrada from '../../assest/entrada.jpg'

const Romboide = () => {
  return (
    <div className='d-flex w-100 flex-column'>
      <div>
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${Entrada})`, // Ruta a tu imagen de fondo
            height: '600px',
            
          }}
        >          
          <div className="romboide ">
              <h1 className='p-2' style={{color:'white', backgroundColor:'black'}}>Sesión de cortesía</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Romboide;
