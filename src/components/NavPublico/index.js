import { useState, useContext, useEffect } from "react";
import { NavBarData } from './NavbarData'
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import Logo2 from "../../assest/logo2.png";
import './styles.css'; 
export default function NavPublico(){
    
    const [showSideBar, setShowSidebar] = useState(false);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    // Función para manejar el clic en el botón del menú
    const handleMenuToggle = () => {
      setMenuOpen(!menuOpen);
    };

    const [ruta, setRuta] = useState('');

    useEffect(() => {
      // Obtiene la ruta actual
      setRuta(window.location.pathname);
    }, []);

    return(
        <div
          className="position-fixed shadow w-100"
          style={{ fontSize: 20, left: 0, height: "60px", zIndex: 2, userSelect:'none' , backgroundColor:'black'}}
        >
          <div className="d-flex flex-row justify-content-between w-100 h-100 pe-2 shadow">
          <nav className="navbar p-0 m-0">
            <span className="menu-bars m-0 menu-toggle" style={{ cursor: "pointer"}}>
              <FaIcons.FaBars
                className="pt-0 mt-0"
                onClick={(e) => (setShowSidebar(!showSideBar),handleMenuToggle(e))}
                style={{height:60,width:30, userSelect:'none',color:'white'}}
                />
              </span>
              {/* Botones en línea */}
              <div className={`buttons ${menuOpen ? 'hidden' : ''}`}>
                <div className="d-flex justify-content-center h-100 text-align-center">         
                  <button 
                    className="pt-2 mt-1 " 
                    style={{backgroundColor:ruta==='/' ? '#9A9A9A' : 'black', color:'white'/* ruta==='/' ? 'black' : 'white' */}}
                    onClick={(e)=>navigate('/')}
                    disabled={ruta==='/' ? true:false}
                  >
                    Nosotros
                  </button>
                  <button 
                    className="pt-2 mt-1 ms-1" 
                    style={{backgroundColor:ruta==='/planes' ? '#9A9A9A' : 'black',color:'white'}}
                    onClick={(e)=>navigate('/planes')}
                  >
                    Planes
                  </button>
                  <button 
                    className="pt-2 mt-1 ms-1" 
                    style={{backgroundColor:ruta==='/horarios' ? '#9A9A9A' : 'black',color:'white'}}
                    onClick={(e)=>navigate('/horarios')}
                  >
                    Horarios
                  </button>
                  <button 
                    className="pt-2 mt-1 ms-1 me-5" 
                    style={{backgroundColor:ruta==='/contactanos' ? '#9A9A9A' : 'black',color:'white'}}
                    onClick={(e)=>navigate('/contactanos')}
                  >
                    Suscripción
                  </button>
                  <button className="d-flex justify-content-center text-align-center mt-2 mb-2 p-1 ps-3 pe-3 fw-bold" 
                    style={{backgroundColor:'#EED112', color:'black'}}
                    onClick={(e)=>navigate('/login')}
                  >Iniciar sesión
                  </button>
                </div>
              </div>
              {/* Menú desplegable en dispositivos móviles */}
              {/* <div className={`menu ${menuOpen ? 'visible' : ''}`}> */}
                <div className={menuOpen ? "nav-menu active" : "nav-menu"}
                  style={{overflow:"auto",width:240,backgroundColor:'black',color:'white'}}
                >
                  <ul
                    className="ms-0 ps-0 d-flex flex-column"
                    onClick={(e) => setShowSidebar(!showSideBar)}
                    style={{width:240, fontSize:18}}
                  >
                    {NavBarData.map((item, index) => {
                        return (
                          <li key={index} className={item.cName} style={{ fontSize:20}}>
                            <Link className="" to={item.path} style={{backgroundColor: ruta === item.path ? '#9A9A9A':'black'}}>
                              {item.icon}
                              <span style={{fontSize:18}}>{item.title}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <ul
                      className="nav-menu-items d-flex flex-column"
                      onClick={(e) => setShowSidebar(!showSideBar)}
                    >
                      <li>
                        <button style={{backgroundColor:'#EED112',color:'black'}} onClick={(e)=>navigate('/login')} className="w-100 fw-bold" variant="contained">Iniciar sesión</button>
                      </li>
                      <li className="text-center ">
                        <span className="m-0" style={{color:'white'}}>Oncaa Web</span>
                      </li>
                    </ul>
                  </div>
                {/* </div> */}
              </nav>
            <div
              id="logo-header"
              className="d-flex flex-row align-items-center gap-2"
            >
              <img
                src={Logo2}
                
                unselectable="false"
                aria-invalid
                
                alt=""
                style={{ height:45, width:70 , userSelect:'none'}}
              />
              <h2 style={{color:'white'}}> OncaaBox</h2>   
              
            </div>
          </div>
        </div>
    )
}