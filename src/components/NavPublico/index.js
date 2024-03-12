import { useState, useContext, useEffect } from "react";
import { NavBarData } from './NavbarData'
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { Button } from "@mui/material";

export default function NavPublico(){
    
    const [showSideBar, setShowSidebar] = useState(false);
    const navigate = useNavigate();

    return(
        <div
          className="position-relative bg-light shadow w-100"
          style={{ fontSize: 20, left: 0, height: "55px", zIndex: 2, userSelect:'none' }}
        >
          <div className="d-flex flex-row justify-content-between w-100 h-100 px-4 shadow">
            <div
              id="logo-header"
              className="d-flex flex-row align-items-center gap-2"
            >
            <span className="menu-bars m-0" style={{ cursor: "pointer"}}>
              <footer>
                <FaIcons.FaBars
                  className="text-danger"
                  onClick={(e) => setShowSidebar(!showSideBar)}
                  style={{height:90,width:30, userSelect:'none'}}
                />
                </footer>
              </span>
              
            </div>
            {/* <div className="d-flex justify-content-center">
              <Button variant="contained">Iniciar sección</Button>
            </div> */}
          </div>
          <nav
            className={showSideBar ? "bg-light nav-menu active" : "nav-menu"}
            style={{overflow:"auto",width:240}}
          >
            <ul
              className="nav-menu-items"
              onClick={(e) => setShowSidebar(!showSideBar)}
              style={{width:240}}
            >
              {NavBarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                
              })}
            </ul>
            <ul
              className="nav-menu-items"
              onClick={(e) => setShowSidebar(!showSideBar)}
            >
              <li>
                <button onClick={(e)=>navigate('/login')} className="w-100" variant="contained">Iniciar sección</button>
              </li>
              <li className="text-center text-secondary">
                <span className="m-0">Oncaa Web</span>
              </li>
            </ul>
          </nav>
        </div>
    )
}