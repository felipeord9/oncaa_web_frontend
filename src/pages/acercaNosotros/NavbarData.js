import * as LiaIcons from "react-icons/lia"
import { GoHomeFill } from 'react-icons/go'
import { RiContactsBook2Fill , RiContactsBookFill} from 'react-icons/ri'
import { CgGym } from "react-icons/cg";
import { RiTimerFill } from "react-icons/ri";
import { MdPhoneInTalk } from "react-icons/md";

export const NavBarData = [
  {
    title:'Acerca de Nosotros',
    path:'/inicio',
    icon:<GoHomeFill/>,
    cName:'nav-text',
    access:['cartera','agencias']   
  },
  {
    title:'Planes',
    path:'/inicio/admin',
    icon:<CgGym />,
    cName:'nav-text',
    access:['admin']   
  },
  {
    title:'Horarios',
    path:'/compras',
    icon:<RiTimerFill />,
    cName:'nav-text',
    access:['compras']   
  },
  {title:'Contactos',
    path:'/contado/persona/natural',
    icon:<MdPhoneInTalk />,
    cName:'nav-text',
    access:['admin','cartera','agencias']
  }
  
];