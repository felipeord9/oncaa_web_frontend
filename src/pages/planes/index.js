import NavPublico from '../../components/NavPublico'
import Boseto from '../../assest/boseto_planes.png'
import Romboide from '../../components/romboide';
import Maquinas from '../../assest/maquinas.png'
import './styles.css'

export default function Planes(){

    return(
        <div>
            <NavPublico/>
            <div className='container'>
                <div className='row'>
                <div className='col col-12 col-lg-12 col-md-6 d-flex flex-row mt-5 pt-5' >
                    <div className='d-flex flex-column w-100' >
                        <div className='d-flex flex-column justify-content-center text-align-center border border-2 shadow'>
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
                    <div className='p-2 ps-4' >
                    <img src={Maquinas} style={{width:'33vw', borderRadius:10}}/>
                    </div>
                </div>
                </div>
            </div>
            {/* <img src={Boseto} className='w-100' style={{height:'75vh'}}/> */}
            <center className='w-100 d-flex flex-column mt-4'>
                <div className='w-100 d-flex justify-content-center text-align-center'>
                    <Romboide/>
                </div>
            </center>
        </div>
    )
}