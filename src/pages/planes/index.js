import NavPublico from '../../components/NavPublico'
import Boseto from '../../assest/boseto_planes.png'
import Romboide from '../../components/romboide';
import './styles.css'

export default function Planes(){

    return(
        <div>
            <NavPublico/>
            <img src={Boseto} className='w-100' style={{height:'75vh'}}/>
            <center className='w-100 d-flex flex-column mt-4'>
                <h2 className='fw-bold' style={{color:'black'}}>Te ofrecemos</h2>
                <div className='w-100 d-flex justify-content-center text-align-center'>
                    <Romboide/>
                    
                </div>
            </center>
        </div>
    )
}