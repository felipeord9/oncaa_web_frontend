import NavPublico from '../../components/NavPublico'
import Boseto from '../../assest/boseto_horarios.png'
import './styles.css'

export default function Horarios(){
    return(
        <div>
            <NavPublico/>
            <div className='wrapper'>
            <div className='container' >
                <div className='row'>
                    <div className='d-flex justify-content-center text-align-center w-100 h-100 margin-horario' >
                    <div className='w-100 h-100' style={{fontSize:13}}>
                        <div className='h-100 '>
                            <div className='w-100 p-1 d-flex justify-content-center flex-column h-100' style={{borderRadius:5}}>
                                <div className='w-100 p-2 d-flex justify-content-center ' >
                                    <div className=' p-2 d-flex justify-content-center text-align-center align-items-center flex-column div-clas-titulo' style={{fontSize:12, backgroundColor:'#FFEA00', color:'#000', borderRadius: '1.5rem',fontSize: '2rem', fontWeight: 'bold', padding: '0.5rem 1rem'}}>
                                {/* <div className='d-flex w-100 justify-content-center flex-column text-align-center align-items-center div-horarios' style={{ backgroundColor: '#FFEA00', color: '#000', fontSize: '2rem', fontWeight: 'bold', padding: '0.5rem 1rem', borderRadius: '1rem' }}> */}
                                        <h1 className='mb-0 pb-0 ps-3 pe-3 fw-bold w-100 d-flex justify-content-center text-align-center align-items-center' style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}><strong>Horarios</strong></h1> 
                                        <h1 className='mt-0 pt-0 fw-bold ps-5 pe-5 clases' style={{color:'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}><strong>Clases cada hora</strong></h1>
                                    </div>
                                </div>
                                <div className='w-100 p-2 d-flex justify-content-center' >
                                    <div className='m-2 p-2 d-flex justify-content-center text-align-center align-items-center flex-column div-clases' style={{fontSize:12, backgroundColor:'black', color:'white', borderRadius: '1.5rem'}}>
                                        <h2>Mañana</h2>
                                        <h3>6am - 10am</h3>
                                        <div className='w-100 d-flex flex-row'>
                                            <h5 className="text-sm w-50 d-flex justify-content-end text-align-end items-align-end pe-2 ps-4" style={{color:'#EED112'}}>Primera Clase</h5>
                                            <h5 className="text-sm w-50 d-flex justify-content-start text-align-start items-align-start ps-2" style={{color:'#EED112'}}>Última Clase</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-100 p-2 pt-1 d-flex justify-content-center' >
                                    <div className='m-2 p-2 d-flex justify-content-center text-align-center align-items-center flex-column div-clases' style={{fontSize:12, backgroundColor:'black', color:'white', borderRadius: '1.5rem'}}>
                                        <h2>Tarde-Noche</h2>
                                        <h3>4pm - 9pm</h3>
                                        <div className='w-100 d-flex flex-row'>
                                            <h5 className="text-sm w-50 d-flex justify-content-end text-align-end items-align-end pe-2 ps-4" style={{color:'#EED112'}}>Primera Clase</h5>
                                            <h5 className="text-sm w-50 d-flex justify-content-start text-align-start items-align-start ps-2" style={{color:'#EED112'}}>Última Clase</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-100 p-2 pt-1 d-flex justify-content-center' >
                                    <div className='m-2 p-2 d-flex justify-content-center text-align-center align-items-center flex-column div-clases' style={{fontSize:12, backgroundColor:'black', color:'white', borderRadius: '1.5rem'}}>
                                        <h2>Sábado</h2>
                                        <h3>8am - 12m</h3>
                                        <div className='w-100 d-flex flex-row'>
                                            <h5 className="text-sm w-50 d-flex justify-content-end text-align-end items-align-end pe-2 ps-4" style={{color:'#EED112'}}>Primera Clase</h5>
                                            <h5 className="text-sm w-50 d-flex justify-content-start text-align-start items-align-start ps-2" style={{color:'#EED112'}}>Última Clase</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    </div>


                </div>
            </div>
            </div>
        </div>
    )
}

