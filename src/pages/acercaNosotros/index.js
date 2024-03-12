import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavPublico from '../../components/NavPublico'
import * as FaIcons from "react-icons/fa";
import './styles.css';
import { NavBarData } from "./NavbarData";

export default function AcercaNostros(){
    const [showSideBar, setShowSidebar] = useState(false);

    return(
    <div>
        <NavPublico/>
        {/* <div
          className="position-relative bg-light shadow w-100"
          style={{ fontSize: 20, left: 0, height: "60px", zIndex: 2, userSelect:'none' }}
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
              <li className="text-center text-secondary">
                <span className="m-0">Oncaa Web</span>
              </li>
            </ul>
          </nav>
        </div> */}
        <div className="container-fluid mt-3">
            <div className="row">
                <div 
                    className="col col-12 col-md-6 col-lg-4 top-0 border-right text-align-center d-flex flex-column" 
                    style={{borderRight:'1px solid #ccc'}}
                >
                <h3 className="d-flex text-align-center justify-content-center">Mision</h3>
                <label>
                Se conoce como misión a la función, encargo, o propósito que una persona debe de cumplir, por ejemplo: su misión era supervisar y vigilar las funciones de su equipo de trabajo. La palabra misión viene del latín misisio y el sufijo –sio, entendiéndose como la acción de ser enviado, encargo.

Como tal, misión es una tarea que se confiere a alguien o grupo de personas para realizarla, y la misma puede tener diferentes fines como diplomática, científica, empresarial, cultural, personal, entre otras.

En las religiones, misión es el territorio donde se lleva a cabo la tarea evangelizadora, por ejemplo en Argentina, es conocida la provincia de Misiones donde se asentaron los misioneros jesuitas. En el cristianismo, la misión es predicar la palabra sagrada a través de la iglesia.

En relación a lo anterior, el misionero es el individuo que tiene como tarea divulgar, predicar y llevar su creencia religiosa a diversos lugares que la desconocen o no la practican.

La misión imposible tal como lo indica su nombre, es aquella en la cual no se va a lograr los objetivos trazados. En el mundo cinematográfico, existe la película misión imposible, basada en la serie que lleva el mismo nombre, el grupo de espías logra llevar a cabo unas misiones que
                </label>
                </div>
                <div 
                    className="col col-12 col-md-6 col-lg-4 border-right text-align-center d-flex flex-column" 
                    style={{borderRight:'1px solid #ccc'}}
                >
                <h3 className="d-flex text-align-center justify-content-center">Vision</h3>
                <label>
                Visión es acción y efecto de ver. La expresión ver es apreciar por los ojos, los objetos mediante la luz.

La visión se lleva a cabo a través de la luz que entra por el iris y atraviesa el lente del ojo, este refleja la imagen que se realiza en la retina (formada por células sensibles llamadas: bastones y conos). La retina recibe la información y transforma la imagen en impulsos eléctricos y la traslada al cerebro mediante los nervios ópticos, los impulsos llegan al tálamo y unas terminaciones nerviosas terminan el proceso llevando la información a la corteza visual del cerebro, en donde se forma la imagen.

La visión puede ser: visión central permite ver algo puntual, la visión periférica permite observar todo lo que rodea a la visión central. En la visión binocular o estereoscópica los dos ojos superponen las imágenes que visualizan en ángulos ligeramente diferentes y en la corteza visual se compara las dos visiones, proporcionando una sensación de relieve y profundidad que a la vez permite calcular la distancia en que se encuentran los objetos.

La visión nocturna es la habilidad de observar objetos con poca iluminación, esta habilidad se presenta en los seres humanos de forma limitada lo que recurre a aparatos electrónicos: cámaras de visión nocturnas, que se visualiza a través de rayos de infrarrojo, radiación térmica, entre otros. Actualmente, ya existen gamas de carros que cuentan con un sistema de visión nocturna.
                </label>
                </div>
                <div 
                    className="col col-12 col-md-6 col-lg-4 border-right text-align-center d-flex flex-column" 
                >
                <h3 className="d-flex text-align-center justify-content-center">Historia</h3>
                <label>
                La historian. 1​ es la narración de los sucesos del pasado; generalmente los de la humanidad, aunque, también puede no estar centrada en el humano.n. 2​ Hay quien más breve y concisamente afirma que la historia es el conocimiento del pasado humano.2​3​4​ Asimismo, es una disciplina académica que estudia dichos acontecimientos. A la ciencia o disciplina académica también se le denomina historiografía para distinguirla de la historia entendida como los hechos objetivos sucedidos. Es una ciencia social debido a su clasificación y método; pero, si no se centra en el humano, puede ser considerada como una ciencia natural, especialmente en un marco de la interdisciplinariedad; de cualquier forma, forma parte de la clasificación de la ciencia que engloba las anteriores dos, es decir, una ciencia fáctica (también llamada factual).

Su propósito es averiguar los hechos y procesos que ocurrieron y se desarrollaron en el pasado e interpretarlos ateniéndose a criterios de la mayor objetividad posible; aunque la posibilidad de cumplimiento de tales propósitos y el grado en que sean posibles son en sí mismos objetos de estudio de la historiología o teoría de la historia, como epistemología o conocimiento científico de la historia.[cita requerida]

Se denomina historiador o historiadora a la persona encargada del estudio de la historia. Al historiador profesional se le concibe como el especialista en la disciplina académica de la historia, y al historiador no profesional se le suele denominar cronista.5​
                </label>
                </div>
            </div>
        </div>
    </div>
    )
}