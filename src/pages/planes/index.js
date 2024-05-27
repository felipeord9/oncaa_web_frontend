import NavPublico from '../../components/NavPublico'
import Boseto from '../../assest/boseto_planes.png'
import Romboide from '../../components/romboide';
import Maquinas from '../../assest/maquinas.png'
import Entrada from '../../assest/entrada.jpg'
import Ubicacion from '../../assest/ubicacion.png'

import './styles.css'

export default function Planes(){

    return(
        <div>
            <NavPublico/>
            <div className='container'>
                <div className='row'>
                <div className='col col-12 col-lg-12 col-md-6 div-planes mt-5 pt-4' >
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
                            <h2 className='fw-bold p-2 d-flex justify-content-center text-align-center align-items-center'><strong>$140.000 COP</strong></h2>               
                        </div>
                    </div>
                    <div className=' h-100 w-100 p-3 pt-4 mt-3' >
                        <img src={Maquinas} className='w-100' style={{borderRadius:15}}/* style={{width:'33vw', borderRadius:10}} */ /* className='img-planes' *//>
                    </div>
                </div>
                </div>
            </div>
            {/* <img src={Boseto} className='w-100' style={{height:'75vh'}}/> */}
            <center className='w-100 d-flex flex-column mt-4 ms-0 me-0 ps-0 pe-0'  >
                <div className='w-100 d-flex justify-content-center text-align-center'>
                    <Romboide/>
                </div>
            </center>
            <div className='container'>
                <div className='row'>
                    <div className='col col-12 col-lg-12 col-md-8 div-planes' >
                        <img src={Entrada} className='img-entrada pe-4' /* style={{width:'33vw', borderRadius:10}} */ />
                        <div className='d-flex flex-column w-100 h-100 ps-3 justify-content-center text-align-center align-items-center w-25'>
                            <a href="https://maps.app.goo.gl/GUVnx1p4rmUwYjBMA" target="_blank" style={{textDecoration:'none', color:'black'}}><h2 style={{cursor:'pointer'}}>CALLE 58 #26-87</h2></a>
                            <a href="https://maps.app.goo.gl/GUVnx1p4rmUwYjBMA" target="_blank"><img src={Ubicacion} className='img-ubicacion' style={{cursor:'pointer'}}/></a>
                            <a href="https://maps.app.goo.gl/GUVnx1p4rmUwYjBMA" target="_blank">Da click aquí, para mirar en el mapa</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}