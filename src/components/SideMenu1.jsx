import { Link } from 'react-router-dom';

import './scss/SideMenu.scss';

function SideMenu1(){    
    return(
        <div className="SideMenu">
            
            <div className="SideMenuBar">
            <div className="SideMenuBarText">Test en vivo</div>
            <Link to="/student/0/0/0">Iniciar test</Link>
            </div>

            <div className="SideMenuBar">
            <div className="SideMenuBarText">Cursos</div>
            <Link to="/student/0/0/0">Mis cursos</Link>
            </div>

            <div className="SideMenuBar">
            <div className="SideMenuBarText" >Notas</div>
            <Link to="/studentListnotes/0">Mis notas</Link>
            </div>
        </div>
     )    
}

export default SideMenu1
