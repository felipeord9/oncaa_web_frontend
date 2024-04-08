import React, { useState } from 'react';
import './styles.css';
import Logo2 from "../../assest/logo2.png";

export default function Menu () {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
        <img
                src={Logo2}
                
                unselectable="false"
                aria-invalid
                
                alt=""
                style={{ height:45, width:70 , userSelect:'none'}}
              />
        <ul>
            <li>store</li>
            <li>us</li>
            <li>contact</li>
        </ul>
        <button className='menu-icon'></button>
    </nav>
  );
};

