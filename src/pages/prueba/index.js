import React, { useState } from 'react';
import './styles.css';
import Logo2 from "../../assest/logo2.png";
/* import {FingerprintReader,AcquisitionStarted} from'@digitalpersona/devices'
import '../modulos' */

export default function Menu () {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* <FingerprintReader/> */}
    </div>
  );
};

