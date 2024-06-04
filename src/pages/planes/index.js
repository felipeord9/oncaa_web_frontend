import NavPublico from '../../components/NavPublico'
import Boseto from '../../assest/boseto_planes.png'
import Romboide from '../../components/romboide';
import Maquinas from '../../assest/maquinas.png'
import Entrada from '../../assest/entrada.jpg'
import Ubicacion from '../../assest/ubicacion.png'
import Logo2 from "../../assest/logo2.png";
import { FaPhone } from "react-icons/fa6";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import TerminosyCondiciones from '../../pdfs/Términos y Condiciones de Tratamiento de Datos Personales.pdf'
import './styles.css'

export default function Planes(){
    const handleInstagramClick = () => {
        // Redirigir a la página de Instagram
        window.location.href = 'https://www.instagram.com/oncaabox?igsh=ejRxZndjdmZlNW5o';
      };
      const handleFacebookClick = () => {
        // Redirigir a la página de Instagram
        window.location.href = 'https://www.facebook.com/oncaabox?mibextid=ZbWKwL';
      };
    const correo = 'oncaaweb@gmail.com';
    const handleClick = () => {
      window.location.href = `mailto:${correo}`;
    };
    return(
        <div>
            <NavPublico/>
            <div className='container'>
                <div className='row'>
                <div className='col col-12 col-lg-12 col-md-6 div-planes mt-5 pt-5 mb-5' >
                    <div className='d-flex flex-column w-100' >
                        <div className='d-flex flex-column justify-content-center text-align-center border border-2 shadow' style={{borderRadius:10}}>
                            <div className=' d-flex justify-content-center text-align-center align-items-center'>
                                <h4 className='w-50 p-2 fw-bold d-flex justify-content-center text-align-center align-items-center' style={{backgroundColor:'#EED112', borderRadius:10}}>1 Día</h4> 
                            </div>
                            <h2 className='fw-bold p-2 d-flex justify-content-center text-align-center align-items-center'><strong>$12.000 COP</strong></h2>               
                        </div>
                        <div className='d-flex flex-column justify-content-center text-align-center border border-2 shadow mt-2' style={{borderRadius:10}}>
                            <div className=' d-flex justify-content-center text-align-center align-items-center' >
                                <h4 className='w-50 p-2 fw-bold d-flex justify-content-center text-align-center align-items-center' style={{backgroundColor:'#EED112', borderRadius:10}}>12 Días</h4> 
                            </div>
                            <h2 className='fw-bold p-2 d-flex justify-content-center text-align-center align-items-center'><strong>$120.000 COP</strong></h2>               
                        </div>
                        <div className='d-flex flex-column justify-content-center text-align-center border border-2 shadow mt-2' style={{borderRadius:10}}>
                            <div className=' d-flex justify-content-center text-align-center align-items-center' >
                                <h4 className='w-50 p-1 pt-2 pb-2 fw-bold d-flex justify-content-center text-align-center align-items-center' style={{backgroundColor:'#EED112', borderRadius:10}}>Mensualidad</h4> 
                            </div>
                            <h2 className='fw-bold p-2 d-flex justify-content-center text-align-center align-items-center'><strong>$145.000 COP</strong></h2>               
                        </div>
                    </div>
                    <div className=' h-100 w-100 p-3 pt-1 mt-1' >
                        <img src={Maquinas} className='w-100' style={{borderRadius:15}}/* style={{width:'33vw', borderRadius:10}} */ /* className='img-planes' *//>
                    </div>
                </div>
                </div>
            </div>
            {/* <img src={Boseto} className='w-100' style={{height:'75vh'}}/> */}
            <footer>
                <div className="container-fluid" style={{backgroundColor:'black', color:'white'}}>
                    <div className="row">
                    <div className="col p-4 ps-5 col-12 col-md-12 col-lg-12 justify-content-center text-align-center d-flex w-100">
                    <img className="mt-4 ms-0 logo h-70" src={Logo2} />
                    <div className="d-flex flex-column ">
                        <div className="d-flex flex-row ">
                            <FontAwesomeIcon onClick={handleFacebookClick} style={{width:40,height:40}} className="facebook-icon ms-3" icon={faFacebook} />
                            <FontAwesomeIcon onClick={handleInstagramClick} style={{width:40,height:40}} className="instagram-icon ms-3" icon={faInstagram} />
                        </div>
                        <h5>OncaaBox</h5>
                        <label className="">Cl. 58 # 26 - 45, Palmira, Valle del Cauca</label>
                        <label><a className="mt-1 d-flex" href={`mailto:${correo}`} onClick={handleClick}>{correo}</a></label>
                        <label className=" mt-2"><FaPhone className="me-1"/>315 697 3320</label>
                        <a className="" style={{fontSize:18}} href={TerminosyCondiciones} download="Términos y Condiciones de Tratamiento de Datos Personales.pdf'">Terminos y condiciones</a>
                    </div>
                    </div> 
                    </div>             
                </div>
            </footer>
        </div>
    )
}