import * as LiaIcons from "react-icons/lia"
import { GoHomeFill } from 'react-icons/go'
import { RiContactsBook2Fill , RiContactsBookFill} from 'react-icons/ri'
import { CgGym } from "react-icons/cg";
import { RiTimerFill } from "react-icons/ri";
import { MdPhoneInTalk } from "react-icons/md";

export const NavBarData = [
  {
    title:'Acerca de Nosotros',
    path:'/',
    icon:<GoHomeFill/>,
    cName:'nav-text' 
  },
  {
    title:'Planes',
    path:'/planes',
    icon:<CgGym />,
    cName:'nav-text' 
  },
  {
    title:'Horarios',
    path:'/horarios',
    icon:<RiTimerFill />,
    cName:'nav-text'   
  },
  {title:'Contactanos',
    path:'/contactanos',
    icon:<MdPhoneInTalk />,
    cName:'nav-text'
  }
  
];