import { Link } from 'react-router-dom';

import './scss/SideMenu.scss';

function SideMenu(){    
    return(
        <div className="SideMenu">
            
            <div className="SideMenuBar">
            <div className="SideMenuBarText">Test en vivo</div>
            <Link to="/teacher/0/0">Iniciar test</Link>
            </div>

            <div className="SideMenuBar">
            <div className="SideMenuBarText">Administar Test</div>
            <Link to="/testname/0/0">Crear prueba</Link>
            <Link to="/listTest/">Lista de pruebas</Link>
            </div>
            <div className="SideMenuBar">
            <div className="SideMenuBarText">Administar Cursos</div>
            <Link to="/teachercurse/1">Agregar cursos</Link>
            <Link to="/teachercurse/0">Lista de cursos</Link>
            </div>

            <div className="SideMenuBar">
            <div className="SideMenuBarText" >Mis notas</div>
            <Link to="/teachernotes/0/0">Por test</Link>
            <Link to="/teachernotes/0/0">Por estudiantes</Link>
            <Link to="/">Por curso</Link>
            </div>
        </div>
     )    
}

export default SideMenu
